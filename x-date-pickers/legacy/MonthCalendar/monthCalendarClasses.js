import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getMonthCalendarUtilityClass(slot) {
  return generateUtilityClass('MuiMonthCalendar', slot);
}
export var monthCalendarClasses = generateUtilityClasses('MuiMonthCalendar', ['root']);