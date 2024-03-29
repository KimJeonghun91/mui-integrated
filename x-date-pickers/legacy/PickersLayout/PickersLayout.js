import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from 'my-mui/material/styles';
import { unstable_composeClasses as composeClasses } from 'my-mui/utils';
import { pickersLayoutClasses, getPickersLayoutUtilityClass } from './pickersLayoutClasses';
import usePickerLayout from './usePickerLayout';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var isLandscape = ownerState.isLandscape,
    classes = ownerState.classes;
  var slots = {
    root: ['root', isLandscape && 'landscape'],
    contentWrapper: ['contentWrapper']
  };
  return composeClasses(slots, getPickersLayoutUtilityClass, classes);
};
var PickersLayoutRoot = styled('div', {
  name: 'MuiPickersLayout',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _defineProperty(_defineProperty(_defineProperty({
    display: 'grid',
    gridAutoColumns: 'max-content auto max-content',
    gridAutoRows: 'max-content auto max-content'
  }, "& .".concat(pickersLayoutClasses.toolbar), ownerState.isLandscape ? {
    gridColumn: theme.direction === 'rtl' ? 3 : 1,
    gridRow: '2 / 3'
  } : {
    gridColumn: '2 / 4',
    gridRow: 1
  }), ".".concat(pickersLayoutClasses.shortcuts), ownerState.isLandscape ? {
    gridColumn: '2 / 4',
    gridRow: 1
  } : {
    gridColumn: theme.direction === 'rtl' ? 3 : 1,
    gridRow: '2 / 3'
  }), "& .".concat(pickersLayoutClasses.actionBar), {
    gridColumn: '1 / 4',
    gridRow: 3
  });
});
PickersLayoutRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  as: PropTypes.elementType,
  ownerState: PropTypes.shape({
    isLandscape: PropTypes.bool.isRequired
  }).isRequired,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
};
export { PickersLayoutRoot };
export var PickersLayoutContentWrapper = styled('div', {
  name: 'MuiPickersLayout',
  slot: 'ContentWrapper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.contentWrapper;
  }
})({
  gridColumn: 2,
  gridRow: 2,
  display: 'flex',
  flexDirection: 'column'
});

/**
 * Demos:
 *
 * - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
 *
 * API:
 *
 * - [PickersLayout API](https://mui.com/x/api/date-pickers/pickers-layout/)
 */
var PickersLayout = function PickersLayout(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPickersLayout'
  });
  var _usePickerLayout = usePickerLayout(props),
    toolbar = _usePickerLayout.toolbar,
    content = _usePickerLayout.content,
    tabs = _usePickerLayout.tabs,
    actionBar = _usePickerLayout.actionBar,
    shortcuts = _usePickerLayout.shortcuts;
  var sx = props.sx,
    className = props.className,
    isLandscape = props.isLandscape,
    ref = props.ref,
    wrapperVariant = props.wrapperVariant;
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(PickersLayoutRoot, {
    ref: ref,
    sx: sx,
    className: clsx(className, classes.root),
    ownerState: ownerState,
    children: [isLandscape ? shortcuts : toolbar, isLandscape ? toolbar : shortcuts, /*#__PURE__*/_jsx(PickersLayoutContentWrapper, {
      className: classes.contentWrapper,
      children: wrapperVariant === 'desktop' ? /*#__PURE__*/_jsxs(React.Fragment, {
        children: [content, tabs]
      }) : /*#__PURE__*/_jsxs(React.Fragment, {
        children: [tabs, content]
      })
    }), actionBar]
  });
};
process.env.NODE_ENV !== "production" ? PickersLayout.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: PropTypes.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: PropTypes.object,
  disabled: PropTypes.bool,
  isLandscape: PropTypes.bool.isRequired,
  isValid: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSelectShortcut: PropTypes.func.isRequired,
  onSetToday: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  readOnly: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  value: PropTypes.any,
  view: PropTypes.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']),
  views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']).isRequired).isRequired,
  wrapperVariant: PropTypes.oneOf(['desktop', 'mobile'])
} : void 0;
export { PickersLayout };