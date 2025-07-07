import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { styles } from '@/constants/styles';

export default function Details() {
  const [selectedTimeframeOptionIndex, setSelectedTimeframeOptionIndex] = useState(0);

  const { base, to } = useLocalSearchParams<{base:string, to:string}>();

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const data = [{
    'date': '12 March 2023',
    'rate': 2,
  },
  {
    'date': '23 March 2023',
    'rate': 1.75,
  },
  {
    'date': '27 March 2023',
    'rate': 1,
  },
  {
    'date': '31 March 2023',
    'rate': 1.5,
  },];
  const timeframeOptions = ['D', 'W', 'M', '6M', '1Y', '5Y'];

  const handleChangeTimeframeOption = (index: number) => {
  };

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
      <View>
        <ResponsiveContainer 
          height={300}
          width='100%'>
          <LineChart
            data={data}
            style={styles.font_mono}>
            <CartesianGrid strokeDasharray='5 5' />
            <Line 
              stroke={'green'}
              type='monotone'
              dataKey='rate'
              strokeWidth={2}
              name='Rate' />
            <YAxis orientation='right' />
            <XAxis dataKey='date' tick={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <View className='grid grid-flow-col items-center gap-2'>
          { timeframeOptions.map((option, index) => 
            <Pressable 
              key={option}
              onPress={() => handleChangeTimeframeOption(index)}
              className={`${(selectedTimeframeOptionIndex == index) && 'bg-neutral-300'} items-center p-2 rounded transition duration-300 hover:bg-neutral-400`}>
              <Text style={styles.font_mono}>{option}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
