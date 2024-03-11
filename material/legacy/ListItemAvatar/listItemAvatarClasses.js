import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getListItemAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiListItemAvatar', slot);
}
var listItemAvatarClasses = generateUtilityClasses('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
export default listItemAvatarClasses;