import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getPopoverUtilityClass(slot) {
  return generateUtilityClass('MuiPopover', slot);
}
var popoverClasses = generateUtilityClasses('MuiPopover', ['root', 'paper']);
export default popoverClasses;