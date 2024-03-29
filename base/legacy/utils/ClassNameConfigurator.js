'use client';

import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
var defaultContextValue = {
  disableDefaultClasses: false
};
var ClassNameConfiguratorContext = /*#__PURE__*/React.createContext(defaultContextValue);
if (process.env.NODE_ENV !== 'production') {
  ClassNameConfiguratorContext.displayName = 'ClassNameConfiguratorContext';
}
/**
 * @ignore - internal hook.
 *
 * Wraps the `generateUtilityClass` function and controls how the classes are generated.
 * Currently it only affects whether the classes are applied or not.
 *
 * @returns Function to be called with the `generateUtilityClass` function specific to a component to generate the classes.
 */
export function useClassNamesOverride(generateUtilityClass) {
  var _React$useContext = React.useContext(ClassNameConfiguratorContext),
    disableDefaultClasses = _React$useContext.disableDefaultClasses;
  return function (slot) {
    if (disableDefaultClasses) {
      return '';
    }
    return generateUtilityClass(slot);
  };
}

/**
 * Allows to configure the components within to not apply any built-in classes.
 */
export function ClassNameConfigurator(props) {
  var disableDefaultClasses = props.disableDefaultClasses,
    children = props.children;
  var contextValue = React.useMemo(function () {
    return {
      disableDefaultClasses: disableDefaultClasses != null ? disableDefaultClasses : false
    };
  }, [disableDefaultClasses]);
  return /*#__PURE__*/_jsx(ClassNameConfiguratorContext.Provider, {
    value: contextValue,
    children: children
  });
}