import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import ToggleGroup from '@/components/toggle-group';
import { styles } from '@/constants/styles';

export default function Settings() {
  const APP_VERSION: string = '0.1.0';

  const [theme, setTheme] = useState('auto');

  return (
    <View className='p-8 flex gap-4'>
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        Dark mode
      </Text>
      <ToggleGroup setValue={setTheme} value={theme} options={['auto', 'dark', 'light']} />
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        General settings
      </Text>
      <View className='flex'>
        <Link 
          href='https://github.com/kahseng-dev/currency-converter'
          target='_blank'
          className='py-2 flex flex-row justify-between' >
          <View className='flex flex-row gap-2 items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='logo-github'
                size={styles.icon} />
            </View>
            <Text style={styles.font_mono}>Github Repo</Text>
          </View>
          <Ionicons 
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
        <Link 
          href='https://kahseng.is-a.dev/'
          target='_blank'
          className='py-2 flex flex-row justify-between'>
          <View className='flex flex-row gap-2 items-center'>
            <View className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
              <Ionicons 
                name='person-outline'
                size={styles.icon} />
            </View>
            <Text style={styles.font_mono}>Checkout my other projects</Text>
          </View>
          <Ionicons 
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
      </View>
      <Text style={styles.font_mono}>
        Version {APP_VERSION}
      </Text>
    </View>
  );
}
