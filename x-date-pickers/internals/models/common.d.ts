import { DateView, TimeView } from 'my-mui/x-date-pickers/models/views';
export type WrapperVariant = 'mobile' | 'desktop' | null;
export type TimeViewWithMeridiem = TimeView | 'meridiem';
export type DateOrTimeViewWithMeridiem = DateView | TimeViewWithMeridiem;
