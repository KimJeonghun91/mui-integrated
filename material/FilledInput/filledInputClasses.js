import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';
export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}
const filledInputClasses = _extends({}, inputBaseClasses, generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']));
export default filledInputClasses;