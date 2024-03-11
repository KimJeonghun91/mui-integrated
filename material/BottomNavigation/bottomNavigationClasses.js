import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getBottomNavigationUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigation', slot);
}
const bottomNavigationClasses = generateUtilityClasses('MuiBottomNavigation', ['root']);
export default bottomNavigationClasses;