import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from 'my-mui/utils';
export const getDateCalendarUtilityClass = slot => generateUtilityClass('MuiDateCalendar', slot);
export const dateCalendarClasses = generateUtilityClasses('MuiDateCalendar', ['root', 'viewTransitionContainer']);