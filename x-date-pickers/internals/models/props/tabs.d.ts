import { SxProps } from 'my-mui/system';
import { Theme } from 'my-mui/material/styles';
import { DateOrTimeViewWithMeridiem } from '../common';
export interface BaseTabsProps<TView extends DateOrTimeViewWithMeridiem> {
    /**
     * Currently visible picker view.
     */
    view: TView;
    /**
     * Callback called when a tab is clicked
     * @template TView
     * @param {TView} view The view to open
     */
    onViewChange: (view: TView) => void;
    className?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
export interface ExportedBaseTabsProps {
}
