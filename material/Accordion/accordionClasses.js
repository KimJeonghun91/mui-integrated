import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getAccordionUtilityClass(slot) {
  return generateUtilityClass('MuiAccordion', slot);
}
const accordionClasses = generateUtilityClasses('MuiAccordion', ['root', 'rounded', 'expanded', 'disabled', 'gutters', 'region']);
export default accordionClasses;