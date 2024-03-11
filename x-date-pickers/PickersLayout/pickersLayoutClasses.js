import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
export function getPickersLayoutUtilityClass(slot) {
  return generateUtilityClass('MuiPickersLayout', slot);
}
export const pickersLayoutClasses = generateUtilityClasses('MuiPickersLayout', ['root', 'landscape', 'contentWrapper', 'toolbar', 'actionBar', 'tabs', 'shortcuts']);