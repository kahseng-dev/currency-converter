import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { styles } from '@/constants/styles';

export default function NotFound() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text 
        style={styles.font_mono}
        className='text-center mb-4'>
        404: Page Not Found
      </Text>
      <Link 
        href='./'
        style={styles.font_mono}
        className={styles.button}>
        Go Home
      </Link>
    </View>
  );
}
