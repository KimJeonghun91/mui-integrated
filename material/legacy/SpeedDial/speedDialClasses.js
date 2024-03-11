import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getSpeedDialUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDial', slot);
}
var speedDialClasses = generateUtilityClasses('MuiSpeedDial', ['root', 'fab', 'directionUp', 'directionDown', 'directionLeft', 'directionRight', 'actions', 'actionsClosed']);
export default speedDialClasses;