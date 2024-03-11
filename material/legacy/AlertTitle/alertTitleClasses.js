import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAlertTitleUtilityClass(slot) {
  return generateUtilityClass('MuiAlertTitle', slot);
}
var alertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);
export default alertTitleClasses;