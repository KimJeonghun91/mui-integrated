import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getRadioUtilityClass(slot) {
  return generateUtilityClass('MuiRadio', slot);
}
var radioClasses = generateUtilityClasses('MuiRadio', ['root', 'checked', 'disabled', 'colorPrimary', 'colorSecondary', 'sizeSmall']);
export default radioClasses;