import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "sx"];
import * as React from 'react';
import useEnhancedEffect from 'my-mui/utils/useEnhancedEffect';
import useEventCallback from 'my-mui/utils/useEventCallback';
import { useViews } from '../useViews';
import { isTimeView } from '../../utils/time-utils';

/**
 * Props used to handle the views that are common to all pickers.
 */

/**
 * Props used to handle the views of the pickers.
 */

/**
 * Props used to handle the value of the pickers.
 */

/**
 * Manage the views of all the pickers:
 * - Handles the view switch
 * - Handles the switch between UI views and field views
 * - Handles the focus management when switching views
 */
export var usePickerViews = function usePickerViews(_ref) {
  var props = _ref.props,
    propsFromPickerValue = _ref.propsFromPickerValue,
    additionalViewProps = _ref.additionalViewProps,
    inputRef = _ref.inputRef,
    autoFocusView = _ref.autoFocusView;
  var onChange = propsFromPickerValue.onChange,
    open = propsFromPickerValue.open,
    onSelectedSectionsChange = propsFromPickerValue.onSelectedSectionsChange,
    onClose = propsFromPickerValue.onClose;
  var views = props.views,
    openTo = props.openTo,
    onViewChange = props.onViewChange,
    disableOpenPicker = props.disableOpenPicker,
    viewRenderers = props.viewRenderers,
    timezone = props.timezone;
  var className = props.className,
    sx = props.sx,
    propsToForwardToView = _objectWithoutProperties(props, _excluded);
  var _useViews = useViews({
      view: undefined,
      views: views,
      openTo: openTo,
      onChange: onChange,
      onViewChange: onViewChange,
      autoFocus: autoFocusView
    }),
    view = _useViews.view,
    setView = _useViews.setView,
    defaultView = _useViews.defaultView,
    focusedView = _useViews.focusedView,
    setFocusedView = _useViews.setFocusedView,
    setValueAndGoToNextView = _useViews.setValueAndGoToNextView;
  var _React$useMemo = React.useMemo(function () {
      return views.reduce(function (acc, viewForReduce) {
        var viewMode;
        if (disableOpenPicker) {
          viewMode = 'field';
        } else if (viewRenderers[viewForReduce] != null) {
          viewMode = 'UI';
        } else {
          viewMode = 'field';
        }
        acc.viewModeLookup[viewForReduce] = viewMode;
        if (viewMode === 'UI') {
          acc.hasUIView = true;
        }
        return acc;
      }, {
        hasUIView: false,
        viewModeLookup: {}
      });
    }, [disableOpenPicker, viewRenderers, views]),
    hasUIView = _React$useMemo.hasUIView,
    viewModeLookup = _React$useMemo.viewModeLookup;
  var timeViewsCount = React.useMemo(function () {
    return views.reduce(function (acc, viewForReduce) {
      if (viewRenderers[viewForReduce] != null && isTimeView(viewForReduce)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [viewRenderers, views]);
  var currentViewMode = viewModeLookup[view];
  var shouldRestoreFocus = useEventCallback(function () {
    return currentViewMode === 'UI';
  });
  var _React$useState = React.useState(currentViewMode === 'UI' ? view : null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    popperView = _React$useState2[0],
    setPopperView = _React$useState2[1];
  if (popperView !== view && viewModeLookup[view] === 'UI') {
    setPopperView(view);
  }
  useEnhancedEffect(function () {
    // Handle case of `DateTimePicker` without time renderers
    if (currentViewMode === 'field' && open) {
      onClose();
      setTimeout(function () {
        // focusing the input before the range selection is done
        // calling `onSelectedSectionsChange` outside of timeout results in an inconsistent behavior between Safari And Chrome
        inputRef == null || inputRef.current.focus();
        onSelectedSectionsChange(view);
      });
    }
  }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  useEnhancedEffect(function () {
    if (!open) {
      return;
    }
    var newView = view;

    // If the current view is a field view, go to the last popper view
    if (currentViewMode === 'field' && popperView != null) {
      newView = popperView;
    }

    // If the current view is not the default view and both are UI views
    if (newView !== defaultView && viewModeLookup[newView] === 'UI' && viewModeLookup[defaultView] === 'UI') {
      newView = defaultView;
    }
    if (newView !== view) {
      setView(newView);
    }
    setFocusedView(newView, true);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  var layoutProps = {
    views: views,
    view: popperView,
    onViewChange: setView
  };
  return {
    hasUIView: hasUIView,
    shouldRestoreFocus: shouldRestoreFocus,
    layoutProps: layoutProps,
    renderCurrentView: function renderCurrentView() {
      if (popperView == null) {
        return null;
      }
      var renderer = viewRenderers[popperView];
      if (renderer == null) {
        return null;
      }
      return renderer(_extends({}, propsToForwardToView, additionalViewProps, propsFromPickerValue, {
        views: views,
        timezone: timezone,
        onChange: setValueAndGoToNextView,
        view: popperView,
        onViewChange: setView,
        focusedView: focusedView,
        onFocusedViewChange: setFocusedView,
        showViewSwitcher: timeViewsCount > 1,
        timeViewsCount: timeViewsCount
      }));
    }
  };
};