import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getPaginationItemUtilityClass(slot) {
  return generateUtilityClass('MuiPaginationItem', slot);
}
var paginationItemClasses = generateUtilityClasses('MuiPaginationItem', ['root', 'page', 'sizeSmall', 'sizeLarge', 'text', 'textPrimary', 'textSecondary', 'outlined', 'outlinedPrimary', 'outlinedSecondary', 'rounded', 'ellipsis', 'firstLast', 'previousNext', 'focusVisible', 'disabled', 'selected', 'icon', 'colorPrimary', 'colorSecondary']);
export default paginationItemClasses;