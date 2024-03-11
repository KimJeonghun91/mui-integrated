import * as React from 'react';
import { SupportedColorScheme } from './experimental_extendTheme';
declare const CssVarsProvider: (props: React.PropsWithChildren<Partial<import("my-mui/system").CssVarsProviderConfig<SupportedColorScheme>> & {
    theme?: {
        cssVarPrefix?: string | undefined;
        colorSchemes: Record<SupportedColorScheme, Record<string, any>>;
    } | {
        $$material: {
            cssVarPrefix?: string | undefined;
            colorSchemes: Record<SupportedColorScheme, Record<string, any>>;
        };
    } | undefined;
    documentNode?: Document | null | undefined;
    colorSchemeNode?: Element | null | undefined;
    colorSchemeSelector?: string | undefined;
    storageWindow?: Window | null | undefined;
    disableNestedContext?: boolean | undefined;
    disableStyleSheetGeneration?: boolean | undefined;
}>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>, useColorScheme: () => import("my-mui/system").ColorSchemeContextValue<SupportedColorScheme>, getInitColorSchemeScript: typeof import("my-mui/system").getInitColorSchemeScript;
export { useColorScheme, getInitColorSchemeScript, CssVarsProvider as Experimental_CssVarsProvider, };
