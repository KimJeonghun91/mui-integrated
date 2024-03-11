import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getStepIconUtilityClass(slot) {
  return generateUtilityClass('MuiStepIcon', slot);
}
var stepIconClasses = generateUtilityClasses('MuiStepIcon', ['root', 'active', 'completed', 'error', 'text']);
export default stepIconClasses;