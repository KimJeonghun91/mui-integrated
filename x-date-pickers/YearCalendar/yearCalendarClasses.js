import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export function getYearCalendarUtilityClass(slot) {
  return generateUtilityClass('MuiYearCalendar', slot);
}
export const yearCalendarClasses = generateUtilityClasses('MuiYearCalendar', ['root']);