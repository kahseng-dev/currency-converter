import { useEffect, useState } from 'react';
import { useColorScheme, View, ViewProps } from 'react-native';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore } from '@/services/async-stores';

const ThemeProvider = ({children, className, ...props}:ViewProps) => {
    const [ theme, setTheme ] = useState<string>('');

    const userPreferedTheme = useColorScheme()?.toString();

    const fetchStoredTheme = async () => {
        const storedTheme = await getStore(stores.app_theme);

        if (storedTheme === 'auto' || !userPreferedTheme) return setTheme('light');

        if (!storedTheme) return setTheme(userPreferedTheme);

        return setTheme(storedTheme);
    }

    useEffect(() => {
        fetchStoredTheme();
    }, []);

    return (
        <View className={`${theme ? styles.dark.background : styles.light.background } bg-black flex-1`} {...props}>
            {children}
        </View>
    )
}

export default ThemeProvider;