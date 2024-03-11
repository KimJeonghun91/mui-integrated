import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardActionAreaUtilityClass(slot) {
  return generateUtilityClass('MuiCardActionArea', slot);
}
var cardActionAreaClasses = generateUtilityClasses('MuiCardActionArea', ['root', 'focusVisible', 'focusHighlight']);
export default cardActionAreaClasses;