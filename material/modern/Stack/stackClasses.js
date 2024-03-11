import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getStackUtilityClass(slot) {
  return generateUtilityClass('MuiStack', slot);
}
const stackClasses = generateUtilityClasses('MuiStack', ['root']);
export default stackClasses;