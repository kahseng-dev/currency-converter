import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';

export default function Details() {
  const { base, to } = useLocalSearchParams<{base:string, to:string}>();

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });

  return (
    <View className='p-8 flex gap-4'>
      <View className='flex'>
        <View>
          <Text 
            style={styles.font_mono}
            className='text-xl'>
            {base} to {to}
          </Text>
          <Text 
            style={styles.font_mono}
            className={styles.text_muted}>
            {currencyName.of(base)} to {currencyName.of(to)}
          </Text>
        </View>
        <View>

        </View>
      </View>
      <View>
        <Text 
          style={styles.font_mono}
          className='text-xl'>
          1 {base} = 0 {to}
        </Text>
        <Text 
          className={`flex items-center gap-2 ${styles.text_trending_up}`}
          style={styles.font_mono}>
          <Ionicons 
            name='trending-up-outline'
            size={styles.icon} />
          Up by 0% ({0} {base})
        </Text>
      </View>
      <View></View>
    </View>
  );
}
