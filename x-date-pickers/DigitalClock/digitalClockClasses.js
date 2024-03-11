import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
export function getDigitalClockUtilityClass(slot) {
  return generateUtilityClass('MuiDigitalClock', slot);
}
export const digitalClockClasses = generateUtilityClasses('MuiDigitalClock', ['root', 'list', 'item']);