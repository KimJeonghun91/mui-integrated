import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["autoFocus", "onChange", "className", "disabled", "readOnly", "items", "active", "slots", "slotProps", "skipDisabled"];
import * as React from 'react';
import clsx from 'clsx';
import { alpha, styled, useThemeProps } from 'my-mui/material/styles';
import composeClasses from 'my-mui/utils/composeClasses';
import MenuList from 'my-mui/material/MenuList';
import MenuItem from 'my-mui/material/MenuItem';
import useForkRef from 'my-mui/utils/useForkRef';
import { getMultiSectionDigitalClockSectionUtilityClass } from './multiSectionDigitalClockSectionClasses';
import { DIGITAL_CLOCK_VIEW_HEIGHT, MULTI_SECTION_CLOCK_SECTION_WIDTH } from '../internals/constants/dimensions';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    item: ['item']
  };
  return composeClasses(slots, getMultiSectionDigitalClockSectionUtilityClass, classes);
};
const MultiSectionDigitalClockSectionRoot = styled(MenuList, {
  name: 'MuiMultiSectionDigitalClockSection',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme,
  ownerState
}) => ({
  maxHeight: DIGITAL_CLOCK_VIEW_HEIGHT,
  width: 56,
  padding: 0,
  overflow: 'hidden',
  '@media (prefers-reduced-motion: no-preference)': {
    scrollBehavior: ownerState.alreadyRendered ? 'smooth' : 'auto'
  },
  '@media (pointer: fine)': {
    '&:hover': {
      overflowY: 'auto'
    }
  },
  '@media (pointer: none), (pointer: coarse)': {
    overflowY: 'auto'
  },
  '&:not(:first-of-type)': {
    borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`
  },
  '&:after': {
    display: 'block',
    content: '""',
    // subtracting the height of one item, extra margin and borders to make sure the max height is correct
    height: 'calc(100% - 40px - 6px)'
  }
}));
const MultiSectionDigitalClockSectionItem = styled(MenuItem, {
  name: 'MuiMultiSectionDigitalClockSection',
  slot: 'Item',
  overridesResolver: (_, styles) => styles.item
})(({
  theme
}) => ({
  padding: 8,
  margin: '2px 4px',
  width: MULTI_SECTION_CLOCK_SECTION_WIDTH,
  justifyContent: 'center',
  '&:first-of-type': {
    marginTop: 4
  },
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
  },
  '&.Mui-selected': {
    backgroundColor: (theme.vars || theme).palette.primary.main,
    color: (theme.vars || theme).palette.primary.contrastText,
    '&:focus-visible, &:hover': {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
  }
}));
/**
 * @ignore - internal component.
 */
export const MultiSectionDigitalClockSection = /*#__PURE__*/React.forwardRef(function MultiSectionDigitalClockSection(inProps, ref) {
  var _slots$digitalClockSe;
  const containerRef = React.useRef(null);
  const handleRef = useForkRef(ref, containerRef);
  const previousActive = React.useRef(null);
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMultiSectionDigitalClockSection'
  });
  const {
      autoFocus,
      onChange,
      className,
      disabled,
      readOnly,
      items,
      active,
      slots,
      slotProps,
      skipDisabled
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = React.useMemo(() => _extends({}, props, {
    alreadyRendered: !!containerRef.current
  }), [props]);
  const classes = useUtilityClasses(ownerState);
  const DigitalClockSectionItem = (_slots$digitalClockSe = slots == null ? void 0 : slots.digitalClockSectionItem) != null ? _slots$digitalClockSe : MultiSectionDigitalClockSectionItem;
  React.useEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    const activeItem = containerRef.current.querySelector('[role="option"][aria-selected="true"]');
    if (active && autoFocus && activeItem) {
      activeItem.focus();
    }
    if (!activeItem || previousActive.current === activeItem) {
      return;
    }
    previousActive.current = activeItem;
    const offsetTop = activeItem.offsetTop;

    // Subtracting the 4px of extra margin intended for the first visible section item
    containerRef.current.scrollTop = offsetTop - 4;
  });
  return /*#__PURE__*/_jsx(MultiSectionDigitalClockSectionRoot, _extends({
    ref: handleRef,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    autoFocusItem: autoFocus && active,
    role: "listbox"
  }, other, {
    children: items.map(option => {
      var _option$isDisabled, _option$isDisabled2;
      if (skipDisabled && (_option$isDisabled = option.isDisabled) != null && _option$isDisabled.call(option, option.value)) {
        return null;
      }
      const isSelected = option.isSelected(option.value);
      return /*#__PURE__*/_jsx(DigitalClockSectionItem, _extends({
        onClick: () => !readOnly && onChange(option.value),
        selected: isSelected,
        disabled: disabled || ((_option$isDisabled2 = option.isDisabled) == null ? void 0 : _option$isDisabled2.call(option, option.value)),
        disableRipple: readOnly,
        role: "option"
        // aria-readonly is not supported here and does not have any effect
        ,
        "aria-disabled": readOnly,
        "aria-label": option.ariaLabel,
        "aria-selected": isSelected,
        className: classes.item
      }, slotProps == null ? void 0 : slotProps.digitalClockSectionItem, {
        children: option.label
      }), option.label);
    })
  }));
});