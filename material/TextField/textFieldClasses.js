import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}
const textFieldClasses = generateUtilityClasses('MuiTextField', ['root']);
export default textFieldClasses;