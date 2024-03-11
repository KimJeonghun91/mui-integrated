import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAvatarGroupUtilityClass(slot) {
  return generateUtilityClass('MuiAvatarGroup', slot);
}
var avatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root', 'avatar']);
export default avatarGroupClasses;