import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersPopperUtilityClass(slot) {
  return generateUtilityClass('MuiPickersPopper', slot);
}
export var pickersPopperClasses = generateUtilityClasses('MuiPickersPopper', ['root', 'paper']);