import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass('MuiTableSortLabel', slot);
}
const tableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', ['root', 'active', 'icon', 'iconDirectionDesc', 'iconDirectionAsc']);
export default tableSortLabelClasses;