import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}
const cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);
export default cardContentClasses;