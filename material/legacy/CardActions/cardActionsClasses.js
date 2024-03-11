import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardActionsUtilityClass(slot) {
  return generateUtilityClass('MuiCardActions', slot);
}
var cardActionsClasses = generateUtilityClasses('MuiCardActions', ['root', 'spacing']);
export default cardActionsClasses;