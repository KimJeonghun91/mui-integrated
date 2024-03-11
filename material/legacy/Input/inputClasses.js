import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';
export function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
var inputClasses = _extends({}, inputBaseClasses, generateUtilityClasses('MuiInput', ['root', 'underline', 'input']));
export default inputClasses;