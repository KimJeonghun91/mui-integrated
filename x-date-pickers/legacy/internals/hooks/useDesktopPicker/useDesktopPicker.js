import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["props", "getOpenDialogAriaText"],
  _excluded2 = ["ownerState"],
  _excluded3 = ["ownerState"];
import * as React from 'react';
import { useSlotProps } from 'my-mui/base/utils';
import MuiInputAdornment from 'my-mui/material/InputAdornment';
import IconButton from 'my-mui/material/IconButton';
import useForkRef from 'my-mui/utils/useForkRef';
import useId from 'my-mui/utils/useId';
import { PickersPopper } from '../../components/PickersPopper';
import { useUtils } from '../useUtils';
import { usePicker } from '../usePicker';
import { LocalizationProvider } from '../../../LocalizationProvider';
import { PickersLayout } from '../../../PickersLayout';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Hook managing all the single-date desktop pickers:
 * - DesktopDatePicker
 * - DesktopDateTimePicker
 * - DesktopTimePicker
 */
export var useDesktopPicker = function useDesktopPicker(_ref) {
  var _innerSlotProps$toolb, _innerSlotProps$toolb2, _slots$inputAdornment, _slots$openPickerButt, _slots$layout;
  var props = _ref.props,
    getOpenDialogAriaText = _ref.getOpenDialogAriaText,
    pickerParams = _objectWithoutProperties(_ref, _excluded);
  var slots = props.slots,
    innerSlotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    format = props.format,
    formatDensity = props.formatDensity,
    timezone = props.timezone,
    name = props.name,
    label = props.label,
    inputRef = props.inputRef,
    readOnly = props.readOnly,
    disabled = props.disabled,
    autoFocus = props.autoFocus,
    localeText = props.localeText,
    reduceAnimations = props.reduceAnimations;
  var utils = useUtils();
  var internalInputRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var labelId = useId();
  var isToolbarHidden = (_innerSlotProps$toolb = innerSlotProps == null || (_innerSlotProps$toolb2 = innerSlotProps.toolbar) == null ? void 0 : _innerSlotProps$toolb2.hidden) != null ? _innerSlotProps$toolb : false;
  var _usePicker = usePicker(_extends({}, pickerParams, {
      props: props,
      inputRef: internalInputRef,
      autoFocusView: true,
      additionalViewProps: {},
      wrapperVariant: 'desktop'
    })),
    open = _usePicker.open,
    actions = _usePicker.actions,
    hasUIView = _usePicker.hasUIView,
    layoutProps = _usePicker.layoutProps,
    renderCurrentView = _usePicker.renderCurrentView,
    shouldRestoreFocus = _usePicker.shouldRestoreFocus,
    pickerFieldProps = _usePicker.fieldProps;
  var InputAdornment = (_slots$inputAdornment = slots.inputAdornment) != null ? _slots$inputAdornment : MuiInputAdornment;
  var _useSlotProps = useSlotProps({
      elementType: InputAdornment,
      externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.inputAdornment,
      additionalProps: {
        position: 'end'
      },
      ownerState: props
    }),
    inputAdornmentOwnerState = _useSlotProps.ownerState,
    inputAdornmentProps = _objectWithoutProperties(_useSlotProps, _excluded2);
  var OpenPickerButton = (_slots$openPickerButt = slots.openPickerButton) != null ? _slots$openPickerButt : IconButton;
  var _useSlotProps2 = useSlotProps({
      elementType: OpenPickerButton,
      externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.openPickerButton,
      additionalProps: {
        disabled: disabled || readOnly,
        onClick: open ? actions.onClose : actions.onOpen,
        'aria-label': getOpenDialogAriaText(pickerFieldProps.value, utils),
        edge: inputAdornmentProps.position
      },
      ownerState: props
    }),
    openPickerButtonOwnerState = _useSlotProps2.ownerState,
    openPickerButtonProps = _objectWithoutProperties(_useSlotProps2, _excluded3);
  var OpenPickerIcon = slots.openPickerIcon;
  var Field = slots.field;
  var fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.field,
    additionalProps: _extends({}, pickerFieldProps, isToolbarHidden && {
      id: labelId
    }, {
      readOnly: readOnly,
      disabled: disabled,
      className: className,
      sx: sx,
      format: format,
      formatDensity: formatDensity,
      timezone: timezone,
      label: label,
      name: name,
      autoFocus: autoFocus && !props.open,
      focused: open ? true : undefined
    }),
    ownerState: props
  });

  // TODO: Move to `useSlotProps` when https://github.com/mui/material-ui/pull/35088 will be merged
  if (hasUIView) {
    fieldProps.InputProps = _extends({}, fieldProps.InputProps, _defineProperty({
      ref: containerRef
    }, "".concat(inputAdornmentProps.position, "Adornment"), /*#__PURE__*/_jsx(InputAdornment, _extends({}, inputAdornmentProps, {
      children: /*#__PURE__*/_jsx(OpenPickerButton, _extends({}, openPickerButtonProps, {
        children: /*#__PURE__*/_jsx(OpenPickerIcon, _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.openPickerIcon))
      }))
    }))));
  }
  var slotsForField = _extends({
    textField: slots.textField,
    clearIcon: slots.clearIcon,
    clearButton: slots.clearButton
  }, fieldProps.slots);
  var Layout = (_slots$layout = slots.layout) != null ? _slots$layout : PickersLayout;
  var handleInputRef = useForkRef(internalInputRef, fieldProps.inputRef, inputRef);
  var labelledById = labelId;
  if (isToolbarHidden) {
    if (label) {
      labelledById = "".concat(labelId, "-label");
    } else {
      labelledById = undefined;
    }
  }
  var slotProps = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.toolbar, {
      titleId: labelId
    }),
    popper: _extends({
      'aria-labelledby': labelledById
    }, innerSlotProps == null ? void 0 : innerSlotProps.popper)
  });
  var renderPicker = function renderPicker() {
    return /*#__PURE__*/_jsxs(LocalizationProvider, {
      localeText: localeText,
      children: [/*#__PURE__*/_jsx(Field, _extends({}, fieldProps, {
        slots: slotsForField,
        slotProps: slotProps,
        inputRef: handleInputRef
      })), /*#__PURE__*/_jsx(PickersPopper, _extends({
        role: "dialog",
        placement: "bottom-start",
        anchorEl: containerRef.current
      }, actions, {
        open: open,
        slots: slots,
        slotProps: slotProps,
        shouldRestoreFocus: shouldRestoreFocus,
        reduceAnimations: reduceAnimations,
        children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps == null ? void 0 : slotProps.layout, {
          slots: slots,
          slotProps: slotProps,
          children: renderCurrentView()
        }))
      }))]
    });
  };
  return {
    renderPicker: renderPicker
  };
};