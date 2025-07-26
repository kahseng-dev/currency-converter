import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import CustomText from '@/components/custom-text';
import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore, setStore } from '@/services/async-stores';
import { getAllRates } from '@/services/get-rates';
import type { Rate } from '@/types/rate';

export default function Details() {
  const { from, into } = useLocalSearchParams<{ from:string, into:string }>();

  const [ isDotClick, setIsDotClick ] = useState<boolean>(false);
  const [ isUpTrend, setIsUpTrend ] = useState<boolean>(true);
  const [ isFavourite, setIsFavourite ] = useState<boolean>(false);

  const [ data, setData ] = useState<{ date: string, rate: number }[]>([]);
  const [ trendDetails, setTrendDetails ] = useState<string>('');
  const [ dateDetails, setDateDetails ] = useState<string>('');
  const [ timeframeOption, setTimeframeOption ] = useState<string>('W');

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const timeframeOptions = ['W', 'M', '6M', '1Y', '5Y'];

  const CustomActiveDot = (props:any) => {
    const { cx, cy, payload } = props;
    
    return (
      <circle
        onMouseDown={() => handleActiveDotMouseDown(payload)}
        onMouseUp={() => setIsDotClick(false)}
        className={`${isUpTrend ? 'fill-green-800' : 'fill-red-800'} cursor-pointer stroke-white stroke-2`}
        cx={cx}
        cy={cy}
        r={8} />
  )}

  const fetchStores = async () => {
    const storedFavourites = await getStore(stores.home_favourites);
    
    if (!storedFavourites) return

    let favourites:Rate[] = JSON.parse(storedFavourites);
    let isFavourite = favourites.some(favourite => favourite.from === from && favourite.into === into)
    
    if (!isFavourite) setIsFavourite(false);

    return setIsFavourite(true);
  }

  const fetchRatesHistory = async () => {
    const timeframe = getTimeframe();
    
    const formatData = await getAllRates(from, [into], timeframe)
      .then(fetchData => {
        return Object.entries(fetchData.rates).map(([date, rateObject]) => {
          return { date : date, rate : rateObject[into] }
        })
      })
    
    setData(formatData)

    const oldestRate = formatData[0].rate;
    const currentRate = formatData[formatData.length - 1].rate;
    const rateChange = currentRate - oldestRate;
    const rateChangePercentage = 100 * (currentRate - oldestRate) / oldestRate;
    
    if (currentRate < oldestRate) setIsUpTrend(false);

    return setTrendDetails(`${isUpTrend ? 'Up' : 'Down'} by ${!isNaN(rateChangePercentage) ? rateChangePercentage.toFixed(2) : 0}% (${rateChange.toFixed(4)} ${into})`);
  }

  const handleActiveDotMouseDown = (data: { date:string, rate:number }) => {
    let date:Date = new Date(data.date);
    let locals:Intl.LocalesArgument = 'en-GB';
    let options:Intl.DateTimeFormatOptions = {};

    switch (timeframeOption) {
      case 'W':
        options = { weekday: 'long', }
        break 
      case 'M':
      case '6M':
      case '1Y':
        options = { day: 'numeric', month: 'long', }
        break
      default:
        options = { day: 'numeric', month: 'long', year: 'numeric', }
        break
    }

    if (!Object.keys(options).length) return
    
    setDateDetails(date.toLocaleDateString(locals, options));
    return setIsDotClick(true);
  }

  const handleConvertCurrency = () => {
    setStore(stores.convert_from, from);
    setStore(stores.convert_into, into);
    return router.push({ pathname: '/convert' });
  }

  const handleFavouriteClick = async () => {
    let rate:Rate = { from: from, into: into, rate: 0 }
    const storedFavourites = await getStore(stores.home_favourites);

    if (!storedFavourites) {
      setStore(stores.home_favourites, JSON.stringify([rate]));
      return setIsFavourite(true);
    }

    let favourites:Rate[] = [];
    favourites = JSON.parse(storedFavourites);
    
    if (isFavourite) {
      let filteredFavourites = favourites.filter(favourite => !(favourite.from === from && favourite.into === into))
      setStore(stores.home_favourites, JSON.stringify(filteredFavourites));
      return setIsFavourite(false);
    }
    
    favourites.push(rate);
    setStore(stores.home_favourites, JSON.stringify(favourites));
    return setIsFavourite(true);
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

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    fetchRatesHistory();
  }, [timeframeOption]);

  return (
    <ScrollView className='p-8'>
      <View className='flex gap-4'>
        <View className='flex-row justify-between items-center'>
          <View>
            <CustomText className='text-xl'>{from} to {into}</CustomText>
            <CustomText className={`text-sm ${styles.text_muted}`}>{currencyName.of(from)} to {currencyName.of(into)}</CustomText>
          </View>
          <Pressable
            onPress={handleFavouriteClick}
            className='size-8 justify-center items-center rounded-full duration-300 transition hover:bg-orange-200'>
            <Ionicons 
              name={isFavourite ? 'star' : 'star-outline'}
              color='#fb923c'
              size={styles.icon} />
          </Pressable>
        </View>
        <View>
          <CustomText className='text-xl'>1 {from} = {data.length > 0 ? data[data.length - 1].rate : 0} {into}</CustomText>
          <CustomText>
            { isDotClick ? 
              <CustomText className={`text-sm ${styles.text_muted}`}>{dateDetails}</CustomText>
              :
              <CustomText className={`${isUpTrend ? 'text-green-800' : 'text-red-800'} text-sm flex gap-2 items-center`}>
                <Ionicons 
                  name={isUpTrend ? 'trending-up-outline' : 'trending-down-outline'}
                  size={styles.icon} />
                {trendDetails}
              </CustomText>
            }
          </CustomText>
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
                stroke={isUpTrend ? 'green': 'darkred'}
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
                labelFormatter={ label => `${new Date(label).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', })}`}
                formatter={ value => `${value} ${into}` }
                separator=' = ' />
            </LineChart>
          </ResponsiveContainer>
          <View className='grid grid-flow-col items-center gap-2'>
            { timeframeOptions.map(option => 
              <Pressable 
                key={option}
                onPress={() => setTimeframeOption(option)}
                className={`${timeframeOption === option && 'bg-neutral-300'} items-center p-2 rounded transition duration-300 hover:bg-neutral-400`}>
                <CustomText>{option}</CustomText>
              </Pressable>
            )}
          </View>
        </View>
        <View className='border border-neutral-500 bg-transparent hover:bg-neutral-300 transition duration-300'>
          <Pressable 
            onPress={handleConvertCurrency}
            className='p-4'>
            <CustomText className='text-sm text-center'>Convert {from} to {into}</CustomText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
