import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getMonthCalendarUtilityClass(slot) {
  return generateUtilityClass('MuiMonthCalendar', slot);
}
export const monthCalendarClasses = generateUtilityClasses('MuiMonthCalendar', ['root']);