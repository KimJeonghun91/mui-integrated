import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbarContent', slot);
}
var snackbarContentClasses = generateUtilityClasses('MuiSnackbarContent', ['root', 'message', 'action']);
export default snackbarContentClasses;