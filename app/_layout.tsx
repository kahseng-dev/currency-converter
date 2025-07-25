import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { stores } from '@/constants/key-stores';
import { themes } from '@/constants/themes';
import { ThemeContext, ThemeOption } from '@/contexts/theme-context';
import { getStore } from '@/services/async-stores';
import '@/styles/globals.css';

export default function RootLayout() {
  const [ theme, setTheme ] = useState<ThemeOption>('auto')
  
  const fetchStoredTheme = async () => {
    const storedTheme = await getStore(stores.app_theme);
    if (storedTheme) return setTheme(storedTheme as ThemeOption);
  }

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider value={theme === 'dark' ? themes.dark : themes.light }>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' options={{ title: 'Not Found' }} />
        </Stack>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
