import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getClockUtilityClass(slot) {
  return generateUtilityClass('MuiClock', slot);
}
export var clockClasses = generateUtilityClasses('MuiClock', ['root', 'clock', 'wrapper', 'squareMask', 'pin', 'amButton', 'pmButton', 'meridiemText']);