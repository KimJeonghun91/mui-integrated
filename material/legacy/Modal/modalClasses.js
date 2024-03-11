import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}
var modalClasses = generateUtilityClasses('MuiModal', ['root', 'hidden', 'backdrop']);
export default modalClasses;