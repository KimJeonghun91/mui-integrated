import { isHostComponent } from 'my-mui/base/utils';
var shouldSpreadAdditionalProps = function shouldSpreadAdditionalProps(Slot) {
  return !Slot || !isHostComponent(Slot);
};
export default shouldSpreadAdditionalProps;