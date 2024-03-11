import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export var getDateCalendarUtilityClass = function getDateCalendarUtilityClass(slot) {
  return generateUtilityClass('MuiDateCalendar', slot);
};
export var dateCalendarClasses = generateUtilityClasses('MuiDateCalendar', ['root', 'viewTransitionContainer']);