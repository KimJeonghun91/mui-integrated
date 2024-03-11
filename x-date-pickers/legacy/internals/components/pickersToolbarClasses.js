import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiPickersToolbar', slot);
}
export var pickersToolbarClasses = generateUtilityClasses('MuiPickersToolbar', ['root', 'content']);