import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAccordionActionsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionActions', slot);
}
var accordionActionsClasses = generateUtilityClasses('MuiAccordionActions', ['root', 'spacing']);
export default accordionActionsClasses;