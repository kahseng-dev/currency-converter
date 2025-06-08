import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/constants/styles';

export default function Convert() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState({base: 'USD', to: 'SGD', rate: 0});

  return (
    <View className='p-8 flex gap-8'>
      <Pressable className='p-8 flex flex-row justify-between border-2 rounded-lg bg-white shadow'>
        <View className='flex flex-row items-center gap-2'>
          <Text
            className='text-xl'
            style={styles.font_mono}>
            {rate.base}
          </Text>
          <Ionicons
            name='chevron-down'
            size={styles.icon} />
        </View>
        <Text
          className='text-xl'
          style={styles.font_mono}>
          {amount}
        </Text>
      </Pressable>
      <Pressable className='p-8 flex flex-row justify-between border-2 rounded-lg bg-white shadow'>
        <View className='flex flex-row items-center gap-2'>
          <Text
            className='text-xl'
            style={styles.font_mono}>
            {rate.to}
          </Text>
          <Ionicons
            name='chevron-down'
            size={styles.icon} />
        </View>
        <Text
          className='text-xl'
          style={styles.font_mono}>
          {amount}
        </Text>
      </Pressable>
      <Text 
        className='text-center'
        style={styles.font_mono}>
        1 {rate.base} = {rate.rate} {rate.to} at mid-market rate
      </Text>
    </View>
  );
}
