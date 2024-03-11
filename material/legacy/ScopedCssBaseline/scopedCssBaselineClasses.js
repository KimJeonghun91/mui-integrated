import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getScopedCssBaselineUtilityClass(slot) {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}
var scopedCssBaselineClasses = generateUtilityClasses('MuiScopedCssBaseline', ['root']);
export default scopedCssBaselineClasses;