import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["PaperComponent", "popperPlacement", "ownerState", "children", "paperSlotProps", "paperClasses", "onPaperClick", "onPaperTouchStart"];
import * as React from 'react';
import { useSlotProps } from 'my-mui/base/utils';
import Grow from 'my-mui/material/Grow';
import Fade from 'my-mui/material/Fade';
import MuiPaper from 'my-mui/material/Paper';
import MuiPopper from 'my-mui/material/Popper';
import BaseFocusTrap from 'my-mui/material/Unstable_TrapFocus';
import { unstable_useForkRef as useForkRef, unstable_useEventCallback as useEventCallback, unstable_ownerDocument as ownerDocument, unstable_composeClasses as composeClasses } from 'my-mui/utils';
import { styled, useThemeProps } from 'my-mui/material/styles';
import { getPickersPopperUtilityClass } from './pickersPopperClasses';
import { getActiveElement } from '../utils/utils';
import { useDefaultReduceAnimations } from '../hooks/useDefaultReduceAnimations';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    paper: ['paper']
  };
  return composeClasses(slots, getPickersPopperUtilityClass, classes);
};
const PickersPopperRoot = styled(MuiPopper, {
  name: 'MuiPickersPopper',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal
}));
const PickersPopperPaper = styled(MuiPaper, {
  name: 'MuiPickersPopper',
  slot: 'Paper',
  overridesResolver: (_, styles) => styles.paper
})(({
  ownerState
}) => _extends({
  outline: 0,
  transformOrigin: 'top center'
}, ownerState.placement.includes('top') && {
  transformOrigin: 'bottom center'
}));
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
 * Based on my-mui/material/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 * @param {boolean} active Only listen to clicks when the popper is opened.
 * @param {(event: MouseEvent | TouchEvent) => void} onClickAway The callback to call when clicking outside the popper.
 * @returns {Array} The ref and event handler to listen to the outside clicks.
 */
function useClickAwayListener(active, onClickAway) {
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    function armClickAwayListener() {
      activatedRef.current = true;
    }
    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);
    return () => {
      document.removeEventListener('mousedown', armClickAwayListener, true);
      document.removeEventListener('touchstart', armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = useEventCallback(event => {
    if (!activatedRef.current) {
      return;
    }

    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);

    // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.
    if (!nodeRef.current ||
    // is a TouchEvent?
    'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }
    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };
  React.useEffect(() => {
    if (active) {
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return () => {
        doc.removeEventListener('click', handleClickAway);
        // cleanup `handleClickAway`
        syntheticEventRef.current = false;
      };
    }
    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}
const PickersPopperPaperWrapper = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      PaperComponent,
      popperPlacement,
      ownerState: inOwnerState,
      children,
      paperSlotProps,
      paperClasses,
      onPaperClick,
      onPaperTouchStart
      // picks up the style props provided by `Transition`
      // https://mui.com/material-ui/transitions/#child-requirement
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, inOwnerState, {
    placement: popperPlacement
  });
  const paperProps = useSlotProps({
    elementType: PaperComponent,
    externalSlotProps: paperSlotProps,
    additionalProps: {
      tabIndex: -1,
      elevation: 8,
      ref
    },
    className: paperClasses,
    ownerState
  });
  return /*#__PURE__*/_jsx(PaperComponent, _extends({}, other, paperProps, {
    onClick: event => {
      var _paperProps$onClick;
      onPaperClick(event);
      (_paperProps$onClick = paperProps.onClick) == null || _paperProps$onClick.call(paperProps, event);
    },
    onTouchStart: event => {
      var _paperProps$onTouchSt;
      onPaperTouchStart(event);
      (_paperProps$onTouchSt = paperProps.onTouchStart) == null || _paperProps$onTouchSt.call(paperProps, event);
    },
    ownerState: ownerState,
    children: children
  }));
});
export function PickersPopper(inProps) {
  var _slots$desktopTransit, _slots$desktopTrapFoc, _slots$desktopPaper, _slots$popper;
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersPopper'
  });
  const {
    anchorEl,
    children,
    containerRef = null,
    shouldRestoreFocus,
    onBlur,
    onDismiss,
    open,
    role,
    placement,
    slots,
    slotProps,
    reduceAnimations: inReduceAnimations
  } = props;
  React.useEffect(() => {
    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Blink?) use 'Esc'
      if (open && (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc')) {
        onDismiss();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss, open]);
  const lastFocusedElementRef = React.useRef(null);
  React.useEffect(() => {
    if (role === 'tooltip' || shouldRestoreFocus && !shouldRestoreFocus()) {
      return;
    }
    if (open) {
      lastFocusedElementRef.current = getActiveElement(document);
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      // make sure the button is flushed with updated label, before returning focus to it
      // avoids issue, where screen reader could fail to announce selected date after selection
      setTimeout(() => {
        if (lastFocusedElementRef.current instanceof HTMLElement) {
          lastFocusedElementRef.current.focus();
        }
      });
    }
  }, [open, role, shouldRestoreFocus]);
  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onBlur != null ? onBlur : onDismiss);
  const paperRef = React.useRef(null);
  const handleRef = useForkRef(paperRef, containerRef);
  const handlePaperRef = useForkRef(handleRef, clickAwayRef);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const defaultReduceAnimations = useDefaultReduceAnimations();
  const reduceAnimations = inReduceAnimations != null ? inReduceAnimations : defaultReduceAnimations;
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      // stop the propagation to avoid closing parent modal
      event.stopPropagation();
      onDismiss();
    }
  };
  const Transition = ((_slots$desktopTransit = slots == null ? void 0 : slots.desktopTransition) != null ? _slots$desktopTransit : reduceAnimations) ? Fade : Grow;
  const FocusTrap = (_slots$desktopTrapFoc = slots == null ? void 0 : slots.desktopTrapFocus) != null ? _slots$desktopTrapFoc : BaseFocusTrap;
  const Paper = (_slots$desktopPaper = slots == null ? void 0 : slots.desktopPaper) != null ? _slots$desktopPaper : PickersPopperPaper;
  const Popper = (_slots$popper = slots == null ? void 0 : slots.popper) != null ? _slots$popper : PickersPopperRoot;
  const popperProps = useSlotProps({
    elementType: Popper,
    externalSlotProps: slotProps == null ? void 0 : slotProps.popper,
    additionalProps: {
      transition: true,
      role,
      open,
      anchorEl,
      placement,
      onKeyDown: handleKeyDown
    },
    className: classes.root,
    ownerState: props
  });
  return /*#__PURE__*/_jsx(Popper, _extends({}, popperProps, {
    children: ({
      TransitionProps,
      placement: popperPlacement
    }) => /*#__PURE__*/_jsx(FocusTrap, _extends({
      open: open,
      disableAutoFocus: true
      // pickers are managing focus position manually
      // without this prop the focus is returned to the button before `aria-label` is updated
      // which would force screen readers to read too old label
      ,
      disableRestoreFocus: true,
      disableEnforceFocus: role === 'tooltip',
      isEnabled: () => true
    }, slotProps == null ? void 0 : slotProps.desktopTrapFocus, {
      children: /*#__PURE__*/_jsx(Transition, _extends({}, TransitionProps, slotProps == null ? void 0 : slotProps.desktopTransition, {
        children: /*#__PURE__*/_jsx(PickersPopperPaperWrapper, {
          PaperComponent: Paper,
          ownerState: ownerState,
          popperPlacement: popperPlacement,
          ref: handlePaperRef,
          onPaperClick: onPaperClick,
          onPaperTouchStart: onPaperTouchStart,
          paperClasses: classes.paper,
          paperSlotProps: slotProps == null ? void 0 : slotProps.desktopPaper,
          children: children
        })
      }))
    }))
  }));
}