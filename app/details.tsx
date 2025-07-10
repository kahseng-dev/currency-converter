import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { setStore } from '@/services/async-stores';

export default function Details() {
  const { from, into } = useLocalSearchParams<{ from:string, into:string }>();

  const [detailsSpan, setDetailsSpan] = useState('');
  const [selectedTimeframeOption, setSelectedTimeframeOption] = useState(0);

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const data = [{
    'date': '2023-03-12',
    'rate': 2,
  },
  {
    'date': '2023-03-23',
    'rate': 1.75,
  },
  {
    'date': '2023-03-27',
    'rate': 1,
  },
  {
    'date': '2023-03-31',
    'rate': 1.5,
  },];
  const timeframeOptions = ['W', 'M', '6M', '1Y', '5Y'];

  const CustomActiveDot = (props:any) => {
    const { cx, cy, payload } = props;
    
    return (
      <circle
        onMouseDown={() => handleActiveDotMouseDown(payload)}
        onMouseUp={handleActiveDotMouseUp}
        className='cursor-pointer stroke-white stroke-2 fill-green-700'
        cx={cx}
        cy={cy}
        r={8} />
  )};

  const handleActiveDotMouseDown = (data: { date:string, rate:number }) => {
    let date = new Date(data.date);

    switch (selectedTimeframeOption) {
      case 0: // Week
        return setDetailsSpan(date.toLocaleDateString('en-GB', {
          weekday: "long",
        }));
      case 1: // 1 Month
      case 2: // 6 Months
      case 3: // 1 Year
        return setDetailsSpan(date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
        }));
      default:
        return setDetailsSpan(date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }));
    }
  };

  const handleActiveDotMouseUp = () => {
    return setDetailsSpan('');
  };

  const handleChangeTimeframeOption = (index: number) => {
    return setSelectedTimeframeOption(index);
  };

  const handleConvertCurrency = () => {
    setStore(stores.convert_from, from);
    setStore(stores.convert_into, into);

    return router.push({ pathname: '/convert' });
  }

  return (
    <View className='p-8 flex gap-4'>
      <View className='flex'>
        <View>
          <Text 
            style={styles.font_mono}
            className='text-xl'>
            {from} to {into}
          </Text>
          <Text 
            style={styles.font_mono}
            className={`text-sm ${styles.text_muted}`}>
            {currencyName.of(from)} to {currencyName.of(into)}
          </Text>
        </View>
      </View>
      <View>
        <Text 
          style={styles.font_mono}
          className='text-xl'>
          1 {from} = 0 {into}
        </Text>
        <Text style={styles.font_mono}>
          { detailsSpan ? 
            <Text className={`text-sm ${styles.text_muted}`}>
              {detailsSpan}
            </Text>
            :
            <Text className={`text-sm flex gap-2 items-center ${styles.text_trending_up}`}>
              <Ionicons 
                name='trending-up-outline'
                size={styles.icon} />
              Up by 0% ({0} {from})
            </Text>
          }
        </Text>
      </View>
      <View>
        <ResponsiveContainer 
          height={300}
          width='100%'>
          <LineChart
            data={data}
            style={styles.font_mono}
            margin={{ top: 20, right: 5, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray='5 5' />
            <Line 
              stroke={'green'}
              type='monotone'
              dataKey='rate'
              strokeWidth={2}
              dot={false}
              activeDot={<CustomActiveDot />}
              name={`1 ${from}`} />
            <YAxis orientation='right' />
            <XAxis dataKey='date' tick={false} />
            <Tooltip 
              labelFormatter={ label => `${new Date(label).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}`}
              formatter={ value => `${value} ${into}` }
              separator=' = ' />
          </LineChart>
        </ResponsiveContainer>
        <View className='grid grid-flow-col items-center gap-2'>
          { timeframeOptions.map((option, index) => 
            <Pressable 
              key={option}
              onPress={() => handleChangeTimeframeOption(index)}
              className={`${(selectedTimeframeOption == index) && 'bg-neutral-300'} items-center p-2 rounded transition duration-300 hover:bg-neutral-400`}>
              <Text style={styles.font_mono}>{option}</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View className='border border-neutral-500 bg-transparent hover:bg-neutral-300 transition duration-300'>
        <Pressable 
          onPress={handleConvertCurrency}
          className='p-4'>
          <Text 
            style={styles.font_mono}
            className='text-sm text-center'>
            Convert {from} to {into}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
