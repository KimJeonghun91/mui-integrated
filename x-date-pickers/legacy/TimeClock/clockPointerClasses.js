import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getClockPointerUtilityClass(slot) {
  return generateUtilityClass('MuiClockPointer', slot);
}
export var clockPointerClasses = generateUtilityClasses('MuiClockPointer', ['root', 'thumb']);