import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onClick", "onKeyDown", "onFocus", "onBlur", "onMouseUp", "onPaste", "error", "clearable", "onClear", "disabled"];
import * as React from 'react';
import useEnhancedEffect from 'my-mui/utils/useEnhancedEffect';
import useEventCallback from 'my-mui/utils/useEventCallback';
import useForkRef from 'my-mui/utils/useForkRef';
import { useTheme } from 'my-mui/material/styles';
import { useValidation } from '../useValidation';
import { useUtils } from '../useUtils';
import { adjustSectionValue, isAndroid, cleanString, getSectionOrder } from './useField.utils';
import { useFieldState } from './useFieldState';
import { useFieldCharacterEditing } from './useFieldCharacterEditing';
import { getActiveElement } from '../../utils/utils';
export var useField = function useField(params) {
  var utils = useUtils();
  var _useFieldState = useFieldState(params),
    state = _useFieldState.state,
    selectedSectionIndexes = _useFieldState.selectedSectionIndexes,
    _setSelectedSections = _useFieldState.setSelectedSections,
    clearValue = _useFieldState.clearValue,
    clearActiveSection = _useFieldState.clearActiveSection,
    updateSectionValue = _useFieldState.updateSectionValue,
    updateValueFromValueStr = _useFieldState.updateValueFromValueStr,
    setTempAndroidValueStr = _useFieldState.setTempAndroidValueStr,
    sectionsValueBoundaries = _useFieldState.sectionsValueBoundaries,
    placeholder = _useFieldState.placeholder,
    timezone = _useFieldState.timezone;
  var inputRefProp = params.inputRef,
    internalProps = params.internalProps,
    _params$internalProps = params.internalProps,
    _params$internalProps2 = _params$internalProps.readOnly,
    readOnly = _params$internalProps2 === void 0 ? false : _params$internalProps2,
    unstableFieldRef = _params$internalProps.unstableFieldRef,
    minutesStep = _params$internalProps.minutesStep,
    _params$forwardedProp = params.forwardedProps,
    onClick = _params$forwardedProp.onClick,
    onKeyDown = _params$forwardedProp.onKeyDown,
    onFocus = _params$forwardedProp.onFocus,
    onBlur = _params$forwardedProp.onBlur,
    onMouseUp = _params$forwardedProp.onMouseUp,
    onPaste = _params$forwardedProp.onPaste,
    error = _params$forwardedProp.error,
    clearable = _params$forwardedProp.clearable,
    onClear = _params$forwardedProp.onClear,
    disabled = _params$forwardedProp.disabled,
    otherForwardedProps = _objectWithoutProperties(_params$forwardedProp, _excluded),
    fieldValueManager = params.fieldValueManager,
    valueManager = params.valueManager,
    validator = params.validator;
  var _useFieldCharacterEdi = useFieldCharacterEditing({
      sections: state.sections,
      updateSectionValue: updateSectionValue,
      sectionsValueBoundaries: sectionsValueBoundaries,
      setTempAndroidValueStr: setTempAndroidValueStr,
      timezone: timezone
    }),
    applyCharacterEditing = _useFieldCharacterEdi.applyCharacterEditing,
    resetCharacterQuery = _useFieldCharacterEdi.resetCharacterQuery;
  var inputRef = React.useRef(null);
  var handleRef = useForkRef(inputRefProp, inputRef);
  var focusTimeoutRef = React.useRef(undefined);
  var theme = useTheme();
  var isRTL = theme.direction === 'rtl';
  var sectionOrder = React.useMemo(function () {
    return getSectionOrder(state.sections, isRTL);
  }, [state.sections, isRTL]);
  var syncSelectionFromDOM = function syncSelectionFromDOM() {
    var _selectionStart;
    if (readOnly) {
      _setSelectedSections(null);
      return;
    }
    var browserStartIndex = (_selectionStart = inputRef.current.selectionStart) != null ? _selectionStart : 0;
    var nextSectionIndex;
    if (browserStartIndex <= state.sections[0].startInInput) {
      // Special case if browser index is in invisible characters at the beginning
      nextSectionIndex = 1;
    } else if (browserStartIndex >= state.sections[state.sections.length - 1].endInInput) {
      // If the click is after the last character of the input, then we want to select the 1st section.
      nextSectionIndex = 1;
    } else {
      nextSectionIndex = state.sections.findIndex(function (section) {
        return section.startInInput - section.startSeparator.length > browserStartIndex;
      });
    }
    var sectionIndex = nextSectionIndex === -1 ? state.sections.length - 1 : nextSectionIndex - 1;
    _setSelectedSections(sectionIndex);
  };
  var handleInputClick = useEventCallback(function (event) {
    // The click event on the clear button would propagate to the input, trigger this handler and result in a wrong section selection.
    // We avoid this by checking if the call of `handleInputClick` is actually intended, or a side effect.
    if (event.isDefaultPrevented()) {
      return;
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    onClick == null || onClick.apply(void 0, [event].concat(_toConsumableArray(args)));
    syncSelectionFromDOM();
  });
  var handleInputMouseUp = useEventCallback(function (event) {
    onMouseUp == null || onMouseUp(event);

    // Without this, the browser will remove the selected when clicking inside an already-selected section.
    event.preventDefault();
  });
  var handleInputFocus = useEventCallback(function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    onFocus == null || onFocus.apply(void 0, _toConsumableArray(args));
    // The ref is guaranteed to be resolved at this point.
    var input = inputRef.current;
    window.clearTimeout(focusTimeoutRef.current);
    focusTimeoutRef.current = setTimeout(function () {
      // The ref changed, the component got remounted, the focus event is no longer relevant.
      if (!input || input !== inputRef.current) {
        return;
      }
      if (selectedSectionIndexes != null || readOnly) {
        return;
      }
      if (
      // avoid selecting all sections when focusing empty field without value
      input.value.length && Number(input.selectionEnd) - Number(input.selectionStart) === input.value.length) {
        _setSelectedSections('all');
      } else {
        syncSelectionFromDOM();
      }
    });
  });
  var handleInputBlur = useEventCallback(function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    onBlur == null || onBlur.apply(void 0, _toConsumableArray(args));
    _setSelectedSections(null);
  });
  var handleInputPaste = useEventCallback(function (event) {
    onPaste == null || onPaste(event);
    if (readOnly) {
      event.preventDefault();
      return;
    }
    var pastedValue = event.clipboardData.getData('text');
    if (selectedSectionIndexes && selectedSectionIndexes.startIndex === selectedSectionIndexes.endIndex) {
      var activeSection = state.sections[selectedSectionIndexes.startIndex];
      var lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
      var digitsOnly = /^[0-9]+$/.test(pastedValue);
      var digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
      var isValidPastedValue = activeSection.contentType === 'letter' && lettersOnly || activeSection.contentType === 'digit' && digitsOnly || activeSection.contentType === 'digit-with-letter' && digitsAndLetterOnly;
      if (isValidPastedValue) {
        resetCharacterQuery();
        updateSectionValue({
          activeSection: activeSection,
          newSectionValue: pastedValue,
          shouldGoToNextSection: true
        });
        // prevent default to avoid the input change handler being called
        event.preventDefault();
        return;
      }
      if (lettersOnly || digitsOnly) {
        // The pasted value correspond to a single section but not the expected type
        // skip the modification
        event.preventDefault();
        return;
      }
    }
    event.preventDefault();
    resetCharacterQuery();
    updateValueFromValueStr(pastedValue);
  });
  var handleInputChange = useEventCallback(function (event) {
    if (readOnly) {
      return;
    }
    var targetValue = event.target.value;
    if (targetValue === '') {
      resetCharacterQuery();
      clearValue();
      return;
    }
    var eventData = event.nativeEvent.data;
    // Calling `.fill(04/11/2022)` in playwright will trigger a change event with the requested content to insert in `event.nativeEvent.data`
    // usual changes have only the currently typed character in the `event.nativeEvent.data`
    var shouldUseEventData = eventData && eventData.length > 1;
    var valueStr = shouldUseEventData ? eventData : targetValue;
    var cleanValueStr = cleanString(valueStr);

    // If no section is selected or eventData should be used, we just try to parse the new value
    // This line is mostly triggered by imperative code / application tests.
    if (selectedSectionIndexes == null || shouldUseEventData) {
      updateValueFromValueStr(shouldUseEventData ? eventData : cleanValueStr);
      return;
    }
    var keyPressed;
    if (selectedSectionIndexes.startIndex === 0 && selectedSectionIndexes.endIndex === state.sections.length - 1 && cleanValueStr.length === 1) {
      keyPressed = cleanValueStr;
    } else {
      var prevValueStr = cleanString(fieldValueManager.getValueStrFromSections(state.sections, isRTL));
      var startOfDiffIndex = -1;
      var endOfDiffIndex = -1;
      for (var i = 0; i < prevValueStr.length; i += 1) {
        if (startOfDiffIndex === -1 && prevValueStr[i] !== cleanValueStr[i]) {
          startOfDiffIndex = i;
        }
        if (endOfDiffIndex === -1 && prevValueStr[prevValueStr.length - i - 1] !== cleanValueStr[cleanValueStr.length - i - 1]) {
          endOfDiffIndex = i;
        }
      }
      var activeSection = state.sections[selectedSectionIndexes.startIndex];
      var hasDiffOutsideOfActiveSection = startOfDiffIndex < activeSection.start || prevValueStr.length - endOfDiffIndex - 1 > activeSection.end;
      if (hasDiffOutsideOfActiveSection) {
        // TODO: Support if the new date is valid
        return;
      }

      // The active section being selected, the browser has replaced its value with the key pressed by the user.
      var activeSectionEndRelativeToNewValue = cleanValueStr.length - prevValueStr.length + activeSection.end - cleanString(activeSection.endSeparator || '').length;
      keyPressed = cleanValueStr.slice(activeSection.start + cleanString(activeSection.startSeparator || '').length, activeSectionEndRelativeToNewValue);
    }
    if (keyPressed.length === 0) {
      if (isAndroid()) {
        setTempAndroidValueStr(valueStr);
      } else {
        resetCharacterQuery();
        clearActiveSection();
      }
      return;
    }
    applyCharacterEditing({
      keyPressed: keyPressed,
      sectionIndex: selectedSectionIndexes.startIndex
    });
  });
  var handleInputKeyDown = useEventCallback(function (event) {
    onKeyDown == null || onKeyDown(event);

    // eslint-disable-next-line default-case
    switch (true) {
      // Select all
      case event.key === 'a' && (event.ctrlKey || event.metaKey):
        {
          // prevent default to make sure that the next line "select all" while updating
          // the internal state at the same time.
          event.preventDefault();
          _setSelectedSections('all');
          break;
        }

      // Move selection to next section
      case event.key === 'ArrowRight':
        {
          event.preventDefault();
          if (selectedSectionIndexes == null) {
            _setSelectedSections(sectionOrder.startIndex);
          } else if (selectedSectionIndexes.startIndex !== selectedSectionIndexes.endIndex) {
            _setSelectedSections(selectedSectionIndexes.endIndex);
          } else {
            var nextSectionIndex = sectionOrder.neighbors[selectedSectionIndexes.startIndex].rightIndex;
            if (nextSectionIndex !== null) {
              _setSelectedSections(nextSectionIndex);
            }
          }
          break;
        }

      // Move selection to previous section
      case event.key === 'ArrowLeft':
        {
          event.preventDefault();
          if (selectedSectionIndexes == null) {
            _setSelectedSections(sectionOrder.endIndex);
          } else if (selectedSectionIndexes.startIndex !== selectedSectionIndexes.endIndex) {
            _setSelectedSections(selectedSectionIndexes.startIndex);
          } else {
            var _nextSectionIndex = sectionOrder.neighbors[selectedSectionIndexes.startIndex].leftIndex;
            if (_nextSectionIndex !== null) {
              _setSelectedSections(_nextSectionIndex);
            }
          }
          break;
        }

      // Reset the value of the selected section
      case event.key === 'Delete':
        {
          event.preventDefault();
          if (readOnly) {
            break;
          }
          if (selectedSectionIndexes == null || selectedSectionIndexes.startIndex === 0 && selectedSectionIndexes.endIndex === state.sections.length - 1) {
            clearValue();
          } else {
            clearActiveSection();
          }
          resetCharacterQuery();
          break;
        }

      // Increment / decrement the selected section value
      case ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key):
        {
          event.preventDefault();
          if (readOnly || selectedSectionIndexes == null) {
            break;
          }
          var activeSection = state.sections[selectedSectionIndexes.startIndex];
          var activeDateManager = fieldValueManager.getActiveDateManager(utils, state, activeSection);
          var newSectionValue = adjustSectionValue(utils, timezone, activeSection, event.key, sectionsValueBoundaries, activeDateManager.date, {
            minutesStep: minutesStep
          });
          updateSectionValue({
            activeSection: activeSection,
            newSectionValue: newSectionValue,
            shouldGoToNextSection: false
          });
          break;
        }
    }
  });
  useEnhancedEffect(function () {
    if (!inputRef.current) {
      return;
    }
    if (selectedSectionIndexes == null) {
      if (inputRef.current.scrollLeft) {
        // Ensure that input content is not marked as selected.
        // setting selection range to 0 causes issues in Safari.
        // https://bugs.webkit.org/show_bug.cgi?id=224425
        inputRef.current.scrollLeft = 0;
      }
      return;
    }
    var firstSelectedSection = state.sections[selectedSectionIndexes.startIndex];
    var lastSelectedSection = state.sections[selectedSectionIndexes.endIndex];
    var selectionStart = firstSelectedSection.startInInput;
    var selectionEnd = lastSelectedSection.endInInput;
    if (selectedSectionIndexes.shouldSelectBoundarySelectors) {
      selectionStart -= firstSelectedSection.startSeparator.length;
      selectionEnd += lastSelectedSection.endSeparator.length;
    }
    if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
      // Fix scroll jumping on iOS browser: https://github.com/mui/mui-x/issues/8321
      var currentScrollTop = inputRef.current.scrollTop;
      // On multi input range pickers we want to update selection range only for the active input
      // This helps to avoid the focus jumping on Safari https://github.com/mui/mui-x/issues/9003
      // because WebKit implements the `setSelectionRange` based on the spec: https://bugs.webkit.org/show_bug.cgi?id=224425
      if (inputRef.current === getActiveElement(document)) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
      // Even reading this variable seems to do the trick, but also setting it just to make use of it
      inputRef.current.scrollTop = currentScrollTop;
    }
  });
  var validationError = useValidation(_extends({}, internalProps, {
    value: state.value,
    timezone: timezone
  }), validator, valueManager.isSameError, valueManager.defaultErrorState);
  var inputError = React.useMemo(function () {
    // only override when `error` is undefined.
    // in case of multi input fields, the `error` value is provided externally and will always be defined.
    if (error !== undefined) {
      return error;
    }
    return valueManager.hasError(validationError);
  }, [valueManager, validationError, error]);
  React.useEffect(function () {
    if (!inputError && !selectedSectionIndexes) {
      resetCharacterQuery();
    }
  }, [state.referenceValue, selectedSectionIndexes, inputError]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(function () {
    // Select the right section when focused on mount (`autoFocus = true` on the input)
    if (inputRef.current && inputRef.current === document.activeElement) {
      _setSelectedSections('all');
    }
    return function () {
      return window.clearTimeout(focusTimeoutRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // If `state.tempValueStrAndroid` is still defined when running `useEffect`,
  // Then `onChange` has only been called once, which means the user pressed `Backspace` to reset the section.
  // This causes a small flickering on Android,
  // But we can't use `useEnhancedEffect` which is always called before the second `onChange` call and then would cause false positives.
  React.useEffect(function () {
    if (state.tempValueStrAndroid != null && selectedSectionIndexes != null) {
      resetCharacterQuery();
      clearActiveSection();
    }
  }, [state.tempValueStrAndroid]); // eslint-disable-line react-hooks/exhaustive-deps

  var valueStr = React.useMemo(function () {
    var _state$tempValueStrAn;
    return (_state$tempValueStrAn = state.tempValueStrAndroid) != null ? _state$tempValueStrAn : fieldValueManager.getValueStrFromSections(state.sections, isRTL);
  }, [state.sections, fieldValueManager, state.tempValueStrAndroid, isRTL]);
  var inputMode = React.useMemo(function () {
    if (selectedSectionIndexes == null) {
      return 'text';
    }
    if (state.sections[selectedSectionIndexes.startIndex].contentType === 'letter') {
      return 'text';
    }
    return 'numeric';
  }, [selectedSectionIndexes, state.sections]);
  var inputHasFocus = inputRef.current && inputRef.current === getActiveElement(document);
  var areAllSectionsEmpty = valueManager.areValuesEqual(utils, state.value, valueManager.emptyValue);
  var shouldShowPlaceholder = !inputHasFocus && areAllSectionsEmpty;
  React.useImperativeHandle(unstableFieldRef, function () {
    return {
      getSections: function getSections() {
        return state.sections;
      },
      getActiveSectionIndex: function getActiveSectionIndex() {
        var _selectionStart2, _selectionEnd;
        var browserStartIndex = (_selectionStart2 = inputRef.current.selectionStart) != null ? _selectionStart2 : 0;
        var browserEndIndex = (_selectionEnd = inputRef.current.selectionEnd) != null ? _selectionEnd : 0;
        if (browserStartIndex === 0 && browserEndIndex === 0) {
          return null;
        }
        var nextSectionIndex = browserStartIndex <= state.sections[0].startInInput ? 1 // Special case if browser index is in invisible characters at the beginning.
        : state.sections.findIndex(function (section) {
          return section.startInInput - section.startSeparator.length > browserStartIndex;
        });
        return nextSectionIndex === -1 ? state.sections.length - 1 : nextSectionIndex - 1;
      },
      setSelectedSections: function setSelectedSections(activeSectionIndex) {
        return _setSelectedSections(activeSectionIndex);
      }
    };
  });
  var handleClearValue = useEventCallback(function (event) {
    var _inputRef$current;
    event.preventDefault();
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    onClear == null || onClear.apply(void 0, [event].concat(_toConsumableArray(args)));
    clearValue();
    inputRef == null || (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
    _setSelectedSections(0);
  });
  return _extends({
    placeholder: placeholder,
    autoComplete: 'off',
    disabled: Boolean(disabled)
  }, otherForwardedProps, {
    value: shouldShowPlaceholder ? '' : valueStr,
    inputMode: inputMode,
    readOnly: readOnly,
    onClick: handleInputClick,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onPaste: handleInputPaste,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    onMouseUp: handleInputMouseUp,
    onClear: handleClearValue,
    error: inputError,
    ref: handleRef,
    clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled)
  });
};