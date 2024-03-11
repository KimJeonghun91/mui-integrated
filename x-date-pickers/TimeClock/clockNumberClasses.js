import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getClockNumberUtilityClass(slot) {
  return generateUtilityClass('MuiClockNumber', slot);
}
export const clockNumberClasses = generateUtilityClasses('MuiClockNumber', ['root', 'selected', 'disabled']);