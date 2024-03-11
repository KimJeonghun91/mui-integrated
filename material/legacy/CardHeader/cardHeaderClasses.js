import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass('MuiCardHeader', slot);
}
var cardHeaderClasses = generateUtilityClasses('MuiCardHeader', ['root', 'avatar', 'action', 'content', 'title', 'subheader']);
export default cardHeaderClasses;