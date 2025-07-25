import { DefaultTheme } from '@react-navigation/native';
import colors from 'tailwindcss/colors';

const fonts = DefaultTheme.fonts

export const themes = {
    light: {
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.black,
            text: colors.black,
            background: colors.neutral[200],
            border: colors.neutral[300],
            card: colors.neutral[100],
        },
        fonts,
    },
    dark: {
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.white,
            text: colors.white,
            background: colors.neutral[900],
            border: colors.neutral[700],
            card: colors.neutral[800],
        },
        fonts,
    },
}
