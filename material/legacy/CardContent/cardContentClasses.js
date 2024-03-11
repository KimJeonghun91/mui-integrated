import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}
var cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);
export default cardContentClasses;