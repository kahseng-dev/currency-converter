import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import SegmentedControls from '@/components/segmented-controls';
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
      <SegmentedControls 
        options={['auto', 'dark', 'light']} 
        setValue={setTheme} 
        value={theme} />
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        General settings
      </Text>
      <View className='flex gap-2'>
        <Link 
          href='https://github.com/kahseng-dev/currency-converter'
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
            name='chevron-forward-outline'
            size={styles.icon} />
        </Link>
        <Link 
          href='https://kahseng.is-a.dev/'
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
