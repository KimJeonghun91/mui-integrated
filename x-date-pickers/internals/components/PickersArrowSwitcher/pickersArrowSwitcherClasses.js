import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersArrowSwitcherUtilityClass(slot) {
  return generateUtilityClass('MuiPickersArrowSwitcher', slot);
}
export const pickersArrowSwitcherClasses = generateUtilityClasses('MuiPickersArrowSwitcher', ['root', 'spacer', 'button']);