import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getTimeClockUtilityClass(slot) {
  return generateUtilityClass('MuiTimeClock', slot);
}
export var timeClockClasses = generateUtilityClasses('MuiTimeClock', ['root', 'arrowSwitcher']);