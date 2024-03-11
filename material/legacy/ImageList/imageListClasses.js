import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getImageListUtilityClass(slot) {
  return generateUtilityClass('MuiImageList', slot);
}
var imageListClasses = generateUtilityClasses('MuiImageList', ['root', 'masonry', 'quilted', 'standard', 'woven']);
export default imageListClasses;