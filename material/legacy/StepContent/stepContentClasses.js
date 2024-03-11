import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getStepContentUtilityClass(slot) {
  return generateUtilityClass('MuiStepContent', slot);
}
var stepContentClasses = generateUtilityClasses('MuiStepContent', ['root', 'last', 'transition']);
export default stepContentClasses;