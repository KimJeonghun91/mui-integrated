import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getCardMediaUtilityClass(slot) {
  return generateUtilityClass('MuiCardMedia', slot);
}
const cardMediaClasses = generateUtilityClasses('MuiCardMedia', ['root', 'media', 'img']);
export default cardMediaClasses;