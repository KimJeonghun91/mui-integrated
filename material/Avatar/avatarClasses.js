import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiAvatar', slot);
}
const avatarClasses = generateUtilityClasses('MuiAvatar', ['root', 'colorDefault', 'circular', 'rounded', 'square', 'img', 'fallback']);
export default avatarClasses;