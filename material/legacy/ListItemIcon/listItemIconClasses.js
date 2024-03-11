import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getListItemIconUtilityClass(slot) {
  return generateUtilityClass('MuiListItemIcon', slot);
}
var listItemIconClasses = generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
export default listItemIconClasses;