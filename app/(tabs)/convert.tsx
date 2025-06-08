import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/constants/styles';

export default function Convert() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState({base: 'USD', to: 'SGD'});

  return (
    <View className='p-8 flex'>
      <View className='border rounded'>
        <Text style={styles.font_mono}>
          {rate.base}
        </Text>
        <Ionicons
          name='chevron-down'
          size={styles.icon} />
      </View>
      <View className='border rounded'>
        <Text style={styles.font_mono}>
          {rate.to}
        </Text>
        <Ionicons
          name='chevron-down'
          size={styles.icon} />
      </View>
    </View>
  );
}
