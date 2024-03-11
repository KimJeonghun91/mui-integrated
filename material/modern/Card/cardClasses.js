import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardUtilityClass(slot) {
  return generateUtilityClass('MuiCard', slot);
}
const cardClasses = generateUtilityClasses('MuiCard', ['root']);
export default cardClasses;