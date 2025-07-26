import Ionicons from '@expo/vector-icons/Ionicons';
import { nativeApplicationVersion } from 'expo-application';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import CustomText from '@/components/custom-text';
import SegmentedControls from '@/components/segmented-controls';
import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { ThemeOption, useThemeContext } from '@/contexts/theme-context';
import { getStore, setStore } from '@/services/async-stores';

export default function Settings() {
  
  const { theme, setTheme } = useThemeContext();
  const [ selectedThemeOption, setSelectedThemeOption ] = useState(theme as string);

  const APP_VERSION = nativeApplicationVersion;

  const REPO_LINK = 'https://github.com/kahseng-dev/currency-converter';
  const WEBSITE_LINK = 'https://kahseng.is-a.dev/';
  
  const fetchStoredTheme = async () => {
    const storedTheme = await getStore(stores.app_theme);
    if (!storedTheme) return setSelectedThemeOption('auto');
    return setSelectedThemeOption(storedTheme);
  }

  const handleThemeChange = (value:string) => {
    setStore(stores.app_theme, value);
    setTheme(value as ThemeOption);
    return setSelectedThemeOption(value);
  }

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  return (
    <View className='p-8 gap-4'>
      <CustomText className='py-1 border-b'>Dark mode</CustomText>
      <SegmentedControls 
        options={['auto', 'dark', 'light']} 
        setValue={handleThemeChange} 
        value={selectedThemeOption} />
      <CustomText className='py-1 border-b'>General settings</CustomText>
      <View className='flex gap-2'>
        <Link 
          href={REPO_LINK}
          target='_blank'
          className='p-1.5 flex justify-between items-center rounded-full transition duration-300 hover:bg-neutral-200'>
          <View className='gap-2 flex-row items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='logo-github'
                size={styles.icon} />
            </View>
            <CustomText>Github Repo</CustomText>
          </View>
          <Ionicons 
            className='pr-2'
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
        <Link 
          href={WEBSITE_LINK}
          target='_blank'
          className='p-1.5 flex justify-between items-center rounded-full transition duration-300 hover:bg-neutral-200'>
          <View className='gap-2 flex-row items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='person-outline'
                size={styles.icon} />
            </View>
            <CustomText>Checkout my other projects</CustomText>
          </View>
          <Ionicons 
            className='pr-2'
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
      </View>
      { APP_VERSION && <CustomText>Version {APP_VERSION}</CustomText> }
    </View>
  )
}
