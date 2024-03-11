import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTableUtilityClass(slot) {
  return generateUtilityClass('MuiTable', slot);
}
var tableClasses = generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);
export default tableClasses;