import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getPickersMonthUtilityClass(slot) {
  return generateUtilityClass('MuiPickersMonth', slot);
}
export var pickersMonthClasses = generateUtilityClasses('MuiPickersMonth', ['root', 'monthButton', 'disabled', 'selected']);