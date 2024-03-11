import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass('MuiDialogActions', slot);
}
var dialogActionsClasses = generateUtilityClasses('MuiDialogActions', ['root', 'spacing']);
export default dialogActionsClasses;