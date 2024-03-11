import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
var accordionDetailsClasses = generateUtilityClasses('MuiAccordionDetails', ['root']);
export default accordionDetailsClasses;