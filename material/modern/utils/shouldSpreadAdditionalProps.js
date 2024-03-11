import { isHostComponent } from 'my-mui/base/utils';
const shouldSpreadAdditionalProps = Slot => {
  return !Slot || !isHostComponent(Slot);
};
export default shouldSpreadAdditionalProps;