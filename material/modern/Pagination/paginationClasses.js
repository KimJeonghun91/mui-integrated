import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getPaginationUtilityClass(slot) {
  return generateUtilityClass('MuiPagination', slot);
}
const paginationClasses = generateUtilityClasses('MuiPagination', ['root', 'ul', 'outlined', 'text']);
export default paginationClasses;