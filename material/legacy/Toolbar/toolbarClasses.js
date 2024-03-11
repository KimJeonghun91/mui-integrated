import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiToolbar', slot);
}
var toolbarClasses = generateUtilityClasses('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
export default toolbarClasses;