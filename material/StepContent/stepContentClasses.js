import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getStepContentUtilityClass(slot) {
  return generateUtilityClass('MuiStepContent', slot);
}
const stepContentClasses = generateUtilityClasses('MuiStepContent', ['root', 'last', 'transition']);
export default stepContentClasses;