import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTableFooterUtilityClass(slot) {
  return generateUtilityClass('MuiTableFooter', slot);
}
var tableFooterClasses = generateUtilityClasses('MuiTableFooter', ['root']);
export default tableFooterClasses;