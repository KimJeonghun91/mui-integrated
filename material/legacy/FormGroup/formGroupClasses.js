import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getFormGroupUtilityClass(slot) {
  return generateUtilityClass('MuiFormGroup', slot);
}
var formGroupClasses = generateUtilityClasses('MuiFormGroup', ['root', 'row', 'error']);
export default formGroupClasses;