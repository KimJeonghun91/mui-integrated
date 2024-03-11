import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getMobileStepperUtilityClass(slot) {
  return generateUtilityClass('MuiMobileStepper', slot);
}
const mobileStepperClasses = generateUtilityClasses('MuiMobileStepper', ['root', 'positionBottom', 'positionTop', 'positionStatic', 'dots', 'dot', 'dotActive', 'progress']);
export default mobileStepperClasses;