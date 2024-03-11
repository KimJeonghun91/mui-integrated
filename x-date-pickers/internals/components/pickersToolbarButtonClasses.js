import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersToolbarButtonUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbarButton', slot);
}
export const pickersToolbarButtonClasses = generateUtilityClasses('MuiPickersToolbarButton', ['root']);