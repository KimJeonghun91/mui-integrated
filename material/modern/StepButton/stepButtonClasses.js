import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getStepButtonUtilityClass(slot) {
  return generateUtilityClass('MuiStepButton', slot);
}
const stepButtonClasses = generateUtilityClasses('MuiStepButton', ['root', 'horizontal', 'vertical', 'touchRipple']);
export default stepButtonClasses;