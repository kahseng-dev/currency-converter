import { Link } from 'expo-router';
import { View } from 'react-native';

import CustomText from '@/components/custom-text';
import { styles } from '@/constants/styles';

export default function NotFound() {
  return (
    <View className='flex-1 items-center justify-center'>
      <CustomText className='text-center mb-4'>404: Page Not Found</CustomText>
      <Link href='./' className={styles.button}>
        <CustomText>Go Home</CustomText>
      </Link>
    </View>
  );
}
