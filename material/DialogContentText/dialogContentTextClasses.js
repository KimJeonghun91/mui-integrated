import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getDialogContentTextUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContentText', slot);
}
const dialogContentTextClasses = generateUtilityClasses('MuiDialogContentText', ['root']);
export default dialogContentTextClasses;