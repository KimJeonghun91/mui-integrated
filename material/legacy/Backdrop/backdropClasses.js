import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}
var backdropClasses = generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);
export default backdropClasses;