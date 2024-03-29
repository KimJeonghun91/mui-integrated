import * as React from 'react';
import { DialogProps as MuiDialogProps } from 'my-mui/material/Dialog';
import { PaperProps as MuiPaperProps } from 'my-mui/material/Paper/Paper';
import { TransitionProps as MuiTransitionProps } from 'my-mui/material/transitions/transition';
import { UncapitalizeObjectKeys } from '../utils/slots-migration';
import { UsePickerValueActions } from '../hooks/usePicker/usePickerValue.types';
export interface PickersModalDialogSlotsComponent {
    /**
     * Custom component for the dialog inside which the views are rendered on mobile.
     * @default PickersModalDialogRoot
     */
    Dialog?: React.ElementType<MuiDialogProps>;
    /**
     * Custom component for the paper rendered inside the mobile picker's Dialog.
     * @default Paper from 'my-mui/material'.
     */
    MobilePaper?: React.JSXElementConstructor<MuiPaperProps>;
    /**
     * Custom component for the mobile dialog [Transition](https://mui.com/material-ui/transitions/).
     * @default Fade from 'my-mui/material'.
     */
    MobileTransition?: React.JSXElementConstructor<MuiTransitionProps>;
}
export interface PickersModalDialogSlotsComponentsProps {
    /**
     * Props passed down to the [`Dialog`](https://mui.com/material-ui/api/dialog/) component.
     */
    dialog?: Partial<MuiDialogProps>;
    /**
     * Props passed down to the mobile [Paper](https://mui.com/material-ui/api/paper/) component.
     */
    mobilePaper?: Partial<MuiPaperProps>;
    /**
     * Props passed down to the mobile [Transition](https://mui.com/material-ui/transitions/) component.
     */
    mobileTransition?: Partial<MuiTransitionProps>;
}
export interface PickersModalDialogProps extends UsePickerValueActions {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: UncapitalizeObjectKeys<PickersModalDialogSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PickersModalDialogSlotsComponentsProps;
    open: boolean;
}
export declare function PickersModalDialog(props: React.PropsWithChildren<PickersModalDialogProps>): React.JSX.Element;
