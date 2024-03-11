import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTableHeadUtilityClass(slot) {
  return generateUtilityClass('MuiTableHead', slot);
}
var tableHeadClasses = generateUtilityClasses('MuiTableHead', ['root']);
export default tableHeadClasses;