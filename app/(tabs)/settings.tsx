import { nativeApplicationVersion } from 'expo-application';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import SegmentedControls from '@/components/segmented-controls';
import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore, setStore } from '@/services/async-stores';

export default function Settings() {
  
  const [ theme, setTheme ] = useState<string>('');

  const APP_VERSION = nativeApplicationVersion;
  const REPO_LINK = 'https://github.com/kahseng-dev/currency-converter';
  const WEBSITE_LINK = 'https://kahseng.is-a.dev/';

  const fetchStoredTheme = async () => {
    const storedTheme = await getStore(stores.app_theme);

    if (!storedTheme) return setTheme('auto');

    return setTheme(storedTheme);
  }

  const handleThemeChange = (value:string) => {
    setTheme(value);
    return setStore(stores.app_theme, value);
  }

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  return (
    <View className='p-8 gap-4'>
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        Dark mode
      </Text>
      <SegmentedControls 
        options={['auto', 'dark', 'light']} 
        setValue={handleThemeChange} 
        value={theme} />
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        General settings
      </Text>
      <View className='flex gap-2'>
        <Link 
          href={REPO_LINK}
          target='_blank'
          className='p-1.5 flex justify-between items-center rounded-full hover:bg-neutral-200 transition duration-300' >
          <View className='gap-2 flex-row items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='logo-github'
                size={styles.icon} />
            </View>
            <Text style={styles.font_mono}>Github Repo</Text>
          </View>
          <Ionicons 
            className='pr-2'
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
        <Link 
          href={WEBSITE_LINK}
          target='_blank'
          className='p-1.5 flex justify-between items-center rounded-full hover:bg-neutral-200 transition duration-300'>
          <View className='gap-2 flex-row items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='person-outline'
                size={styles.icon} />
            </View>
            <Text style={styles.font_mono}>Checkout my other projects</Text>
          </View>
          <Ionicons 
            className='pr-2'
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
      </View>
      { APP_VERSION && <Text style={styles.font_mono}>Version {APP_VERSION}</Text> }
    </View>
  )
}
