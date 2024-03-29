import { CreateMUIStyled } from 'my-mui/system';
import { Theme } from './createTheme';

export function rootShouldForwardProp(prop: string): boolean;

export function slotShouldForwardProp(prop: string): boolean;

/**
 * Custom styled utility that has a default MUI theme.
 * @param tag HTML tag or component that should serve as base.
 * @param options Styled options for the created component.
 * @returns React component that has styles attached to it.
 */
declare const styled: CreateMUIStyled<Theme>;

export default styled;
