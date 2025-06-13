import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';
import { getRates } from '@/services/get-rates';

export default function Index() {

  type Rate = { base: string; to: string; rate: number };

  const [rates, setRates] = useState<{favourites: Rate[], popular: Rate[]}>(
    {
      favourites: [
        { base: 'USD', to: 'SGD', rate: 0 }, 
        { base: 'USD', to: 'GBP', rate: 0 },
      ],
      popular: [
        { base: 'GBP', to: 'USD', rate: 0 }, 
        { base: 'EUR', to: 'USD', rate: 0 }, 
        { base: 'USD', to: 'INR', rate: 0 },
      ],
    }
  )

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!data) {
      getRates([...rates.favourites, ...rates.popular]).then(setData);
    }
  }, []);

  const handleViewDetails = (base: string, to: string) => {
    return router.push({ pathname: '/details', params: { base, to } });
  }

  const loadFavourites = () => {
    if (rates.favourites.length === 0) {
      return (
        <View>
          <Text style={styles.font_mono}>
            ⭐ You haven’t added any favourite rates yet.
          </Text>
        </View>
      )
    }

    return (
      <View>
        { rates.favourites.map((rate, index) => 
          <Pressable
            onPress={() => handleViewDetails(rate.base, rate.to)}
            key={index}
            className='p-4 flex flex-row gap-4 hover:bg-neutral-300'>
            <View>
              <Text style={styles.font_mono}>{rate.base}</Text>
              <Text style={styles.font_mono}>{rate.to}</Text>
            </View>
            <View>
              <Text style={styles.font_mono}>{rate.base} to {rate.to}</Text>
              <Text 
                className='text-neutral-500'
                style={styles.font_mono}>
                1 {rate.base} = {rate.rate} {rate.to}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    )
  }

  const loadPopular = () => {
    return (
      <View>
        { rates.popular.map((rate, index) => 
          <Pressable
            onPress={() => handleViewDetails(rate.base, rate.to)}
            key={index}
            className='p-4 flex flex-row gap-4 hover:bg-neutral-300'>
            <View>
              <Text style={styles.font_mono}>{rate.base}</Text>
              <Text style={styles.font_mono}>{rate.to}</Text>
            </View>
            <View>
              <Text style={styles.font_mono}>{rate.base} to {rate.to}</Text>
              <Text 
                className='text-neutral-500'
                style={styles.font_mono}>
                1 {rate.base} = {rate.rate} {rate.to}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    )
  }

  return (
    <View className='p-8 flex gap-4 bg-white h-screen'>
      <View className='flex flex-row justify-between'>
        <Text 
          style={styles.font_mono}
          className='text-xl'>
            Rates
        </Text>
        <Link 
          href='/add-favourites'
          className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
          <Ionicons 
            name='add-outline'
            size={styles.icon} />
        </Link>
      </View>
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        Favourites
      </Text>
      {loadFavourites()}
      <Text 
        style={styles.font_mono}
        className='py-1 border-b border-neutral-300'>
        Popular
      </Text>
      {loadPopular()}
    </View>
  );
}
