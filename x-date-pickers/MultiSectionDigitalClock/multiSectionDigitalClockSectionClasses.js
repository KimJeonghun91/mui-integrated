import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
export function getMultiSectionDigitalClockSectionUtilityClass(slot) {
  return generateUtilityClass('MuiMultiSectionDigitalClockSection', slot);
}
export const multiSectionDigitalClockSectionClasses = generateUtilityClasses('MuiMultiSectionDigitalClockSection', ['root', 'item']);