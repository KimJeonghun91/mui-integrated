import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getBottomNavigationUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigation', slot);
}
var bottomNavigationClasses = generateUtilityClasses('MuiBottomNavigation', ['root']);
export default bottomNavigationClasses;