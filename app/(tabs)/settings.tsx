import { styles } from '@/constants/styles';
import { Pressable, Text, View } from 'react-native';

export default function Settings() {
  const APP_VERSION: string = '0.1.0';

  return (
    <View className='p-8 flex gap-8'>
      <Text 
        style={styles.font_mono}
        className='border-b'>
        Dark mode
      </Text>
      <Pressable className='p-2 flex gap-2 flex-row justify-evenly bg-white rounded shadow'>
        <Text 
          style={styles.font_mono}
          className='py-2 w-1/3 bg-black/20 rounded text-center transition duration-300 hover:bg-black/20'>
          Auto
        </Text>
        <Text 
          style={styles.font_mono}
          className='py-2 w-1/3 rounded text-center transition duration-300 hover:bg-black/20'>
          On
        </Text>
        <Text 
          style={styles.font_mono}
          className='py-2 w-1/3 rounded text-center transition duration-300 hover:bg-black/20'>
          Off
        </Text>
      </Pressable>
      <Text 
        style={styles.font_mono}
        className='border-b'>
        General settings
      </Text>
      <Text style={styles.font_mono}>
        Version {APP_VERSION}
      </Text>
    </View>
  );
}
