import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
export default function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: _defineProperty(_defineProperty({
      minHeight: 56
    }, breakpoints.up('xs'), {
      '@media (orientation: landscape)': {
        minHeight: 48
      }
    }), breakpoints.up('sm'), {
      minHeight: 64
    })
  }, mixins);
}