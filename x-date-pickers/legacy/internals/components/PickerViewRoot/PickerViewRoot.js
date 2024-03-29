import { styled } from 'my-mui/material/styles';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../../constants/dimensions';
export var PickerViewRoot = styled('div')({
  overflow: 'hidden',
  width: DIALOG_WIDTH,
  maxHeight: VIEW_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto'
});