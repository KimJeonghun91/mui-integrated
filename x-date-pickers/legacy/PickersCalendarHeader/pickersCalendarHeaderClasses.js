import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export var getPickersCalendarHeaderUtilityClass = function getPickersCalendarHeaderUtilityClass(slot) {
  return generateUtilityClass('MuiPickersCalendarHeader', slot);
};
export var pickersCalendarHeaderClasses = generateUtilityClasses('MuiPickersCalendarHeader', ['root', 'labelContainer', 'label', 'switchViewButton', 'switchViewIcon']);