import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersToolbarTextUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbarText', slot);
}
export const pickersToolbarTextClasses = generateUtilityClasses('MuiPickersToolbarText', ['root', 'selected']);