import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}
const listItemSecondaryActionClasses = generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);
export default listItemSecondaryActionClasses;