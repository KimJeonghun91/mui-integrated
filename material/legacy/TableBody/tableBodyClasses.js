import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTableBodyUtilityClass(slot) {
  return generateUtilityClass('MuiTableBody', slot);
}
var tableBodyClasses = generateUtilityClasses('MuiTableBody', ['root']);
export default tableBodyClasses;