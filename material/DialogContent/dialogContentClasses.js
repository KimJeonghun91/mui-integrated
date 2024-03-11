import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getDialogContentUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContent', slot);
}
const dialogContentClasses = generateUtilityClasses('MuiDialogContent', ['root', 'dividers']);
export default dialogContentClasses;