'use client';

import * as React from 'react';
import { ThemeContext } from 'my-mui/styled-engine';
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme() {
  var defaultTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}
export default useTheme;