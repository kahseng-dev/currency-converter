import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { setStore } from '@/services/async-stores';
import { getAllRates } from '@/services/get-rates';

export default function Details() {
  const { from, into } = useLocalSearchParams<{ from:string, into:string }>();

  const [ data, setData ] = useState<{ date: string, rate: number }[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ details, setDetails ] = useState<string>('');
  const [ timeframeOption, setTimeframeOption ] = useState<string>('W');

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const rate = data.length > 0 ? data[data.length - 1].rate : 0; 
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

  const fetchRatesHistory = async () => {
    setIsLoading(true);

    let timeframe = getTimeframe();

    let formatData = await getAllRates(from, [into], timeframe)
      .then(fetchData => {
        return Object.entries(fetchData.rates).map(([date, rateObject]) => {
          const value = rateObject[into]
          
          if (value === undefined) return { date : date, rate : 0 }
          
          return { date : date, rate : value }
        })
      })
    
    setData(formatData)
    return setIsLoading(false)
  }

  const handleActiveDotMouseDown = (data: { date:string, rate:number }) => {
    let date = new Date(data.date);

    switch (timeframeOption) {
      case 'W':
        return setDetails(date.toLocaleDateString('en-GB', {
          weekday: "long",
        }));
      case 'M':
      case '6M':
      case '1Y':
        return setDetails(date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
        }));
      default:
        return setDetails(date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }));
    }
  };

  const handleActiveDotMouseUp = () => {
    return setDetails('');
  };

  const handleConvertCurrency = () => {
    setStore(stores.convert_from, from);
    setStore(stores.convert_into, into);
    return router.push({ pathname: '/convert' });
  }

  const getTimeframe = () => {
    const today:Date = new Date();
    const startDate:Date = new Date();

    switch(timeframeOption) {
      case 'W':
        startDate.setDate(today.getDate() - 7);
        break

      case 'M':
        startDate.setMonth(today.getMonth() - 1);
        break

      case '6M':
        startDate.setMonth(today.getMonth() - 6);
        break

      case '1Y':
        startDate.setFullYear(today.getFullYear() - 1);
        break 

      case '5Y':
        startDate.setFullYear(today.getFullYear() - 5);
        break 

      default:
        break
    }

    return `${startDate.toISOString().split('T')[0]}..`.replaceAll(/\s/g,'');
  }

  const handleChangeTimeframe = (option:string) => {
    setTimeframeOption(option);
    return fetchRatesHistory();
  }

  useEffect(() => {
    fetchRatesHistory();
  }, []);

  return (
    <ScrollView className='p-8'>
      <View className='flex gap-4'>
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
        <View>
          <Text 
            style={styles.font_mono}
            className='text-xl'>
            1 {from} = {rate} {into}
          </Text>
          <Text style={styles.font_mono}>
            { details ? 
              <Text className={`text-sm ${styles.text_muted}`}>{details}</Text>
              :
              <Text className={`text-sm flex gap-2 items-center ${styles.text_trending_up}`}>
                <Ionicons 
                  name='trending-up-outline'
                  size={styles.icon} />
                Up by {0}% ({0})
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
                strokeWidth={1}
                dot={false}
                activeDot={<CustomActiveDot />}
                name={`1 ${from}`} />
              <YAxis 
                tickCount={4}
                orientation='right' />
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
            { timeframeOptions.map(option => 
              <Pressable 
                key={option}
                onPress={() => handleChangeTimeframe(option)}
                className={`${timeframeOption === option && 'bg-neutral-300'} items-center p-2 rounded transition duration-300 hover:bg-neutral-400`}>
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
    </ScrollView>
  );
}
