import * as React from 'react';
import getInitColorSchemeScript from './getInitColorSchemeScript';
import { Mode, Result } from './useCurrentColorScheme';

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * DOM attribute for applying color scheme
   * @default 'data-color-scheme'
   */
  attribute?: string;
  /**
   * localStorage key used to store application `mode`
   * @default 'mode'
   */
  modeStorageKey?: string;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * Design system default color scheme.
   * - provides string if the design system has one default color scheme (either light or dark)
   * - provides object if the design system has default light & dark color schemes
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * Design system default mode
   * @default 'light'
   */
  defaultMode?: Mode;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

type Identify<I extends string | undefined, T> = I extends string ? T | { [k in I]: T } : T;

export interface CreateCssVarsProviderResult<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
> {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      Partial<CssVarsProviderConfig<ColorScheme>> & {
        theme?: Identify<
          Identifier,
          {
            cssVarPrefix?: string;
            colorSchemes: Record<ColorScheme, Record<string, any>>;
          }
        >;
        /**
         * The document used to perform `disableTransitionOnChange` feature
         * @default document
         */
        documentNode?: Document | null;
        /**
         * The node used to attach the color-scheme attribute
         * @default document
         */
        colorSchemeNode?: Element | null;
        /**
         * The CSS selector for attaching the generated custom properties
         * @default ':root'
         */
        colorSchemeSelector?: string;
        /**
         * The window that attaches the 'storage' event listener
         * @default window
         */
        storageWindow?: Window | null;
        /**
         * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
         */
        disableNestedContext?: boolean;
        /**
         * If `true`, the style sheet won't be generated.
         *
         * This is useful for controlling nested CssVarsProvider behavior.
         * @default false
         */
        disableStyleSheetGeneration?: boolean;
      }
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof getInitColorSchemeScript;
}

export default function createCssVarsProvider<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * The design system's unique id for getting the corresponded theme when there are multiple design systems.
     */
    themeId?: Identifier;
    /**
     * Design system default theme
     *
     * - The structure inside `theme.colorSchemes[colorScheme]` should be exactly the same in all color schemes because
     * those object of the color scheme will be used when the color scheme is active.
     *
     *  {
     *    colorSchemes: {
     *      light: { ...lightColorSchemeValues },
     *      dark: { ...darkColorSchemeValues }
     *    }
     *  }
     *
     * - If colorScheme is 'light', the `lightColorSchemeValues` will be merged to theme as `{ ...theme, ...lightColorSchemeValues }`
     *   likewise, if colorScheme is 'dark', the `darkColorSchemeValues` will be merged to theme as `{ ...theme, ...darkColorSchemeValues }`
     *
     * - If the theme contains the same keys as the color scheme, their values will be merged.
     *  Ex. {
     *    colorSchemes: {
     *      light: { palette: { primary: { ... } } },
     *      dark: { palette: { primary: { ...} } }
     *    },
     *    palette: { shared: { ... } }
     *  }
     *
     *  becomes: {
     *    colorSchemes: { ... },
     *    palette: { shared: { ... }, primary: { ... } }
     *  }
     */
    theme: any;
    /**
     * A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to ThemeProvider.
     *
     * The example usage is the variant generation in Joy. We need to combine the token from user-input and the default theme first, then generate
     * variants from those tokens.
     */
    resolveTheme?: (theme: any) => any; // the type is any because it depends on the design system.
    /**
     * @internal
     * A function that returns a list of variables that will be excluded from the `colorSchemeSelector` (:root by default)
     *
     * Some variables are intended to be used in a specific color scheme only. They should be excluded when the default mode is set to the color scheme.
     * This is introduced to fix https://github.com/mui/material-ui/issues/34084
     */
    excludeVariablesFromRoot?: (cssVarPrefix: string) => string[];
  },
): CreateCssVarsProviderResult<ColorScheme, Identifier>;

// disable automatic export
export {};
