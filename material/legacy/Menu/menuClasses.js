import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass('MuiMenu', slot);
}
var menuClasses = generateUtilityClasses('MuiMenu', ['root', 'paper', 'list']);
export default menuClasses;