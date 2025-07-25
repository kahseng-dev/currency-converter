import { createContext, useContext } from 'react';

export type ThemeOption = 'auto' | 'light' | 'dark'

interface ThemeContext {
    setTheme: (value: ThemeOption) => void
    theme: ThemeOption
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const useThemeContext = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Must be wrapped with a ThemeContext.Provider")
    }

    return {
        setTheme: themeContext.setTheme,
        theme: themeContext.theme,
    }
}