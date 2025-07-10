import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore } from '@/services/async-stores';
import { getRates } from '@/services/get-rates';
import { Rate } from '@/types/rate';

export default function Index() {
  const [data, setData] = useState<Rate[]>();
  const [rates, setRates] = useState<{ favourites: Rate[], popular: Rate[] }>(
    {
      favourites: [
        { from: 'USD', into: 'SGD', rate: 0 }, 
        { from: 'USD', into: 'GBP', rate: 0 },
      ],
      popular: [
        { from: 'GBP', into: 'USD', rate: 0 }, 
        { from: 'EUR', into: 'USD', rate: 0 }, 
        { from: 'USD', into: 'INR', rate: 0 },
      ],
    }
  )

  const fetchStoredRates = async () => {
    const storedRates = await getStore(stores.home_rates)
    if (storedRates) return setRates(JSON.parse(storedRates))
  }

  const handleViewDetails = (from: string, into: string) => {
    return router.push({ pathname: '/details', params: { from, into } });
  }

  const loadFavourites = () => {
    return <View>
      { rates.favourites.length === 0 ? 
        <View>
          <Text style={styles.font_mono}>
            ⭐ You haven’t added any favourite rates yet.
          </Text>
        </View>
        :
        <View>
          { rates.favourites.map((rate, index) => 
            <Pressable
              onPress={() => handleViewDetails(rate.from, rate.into)}
              key={index}
              className='p-4 flex flex-row gap-4 duration-300 transition hover:bg-neutral-300'>
              <View>
                <Text style={styles.font_mono}>{rate.from}</Text>
                <Text style={styles.font_mono}>{rate.into}</Text>
              </View>
              <View>
                <Text style={styles.font_mono}>{rate.from} to {rate.into}</Text>
                <Text 
                  className='text-neutral-500'
                  style={styles.font_mono}>
                  1 {rate.from} = {rate.rate.toFixed(4)} {rate.into}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      }
    </View>
  }

  const loadPopular = () => {
    return <View>
      { rates.popular.map((rate, index) => 
        <Pressable
          onPress={() => handleViewDetails(rate.from, rate.into)}
          key={index}
          className='p-4 flex flex-row gap-4 duration-300 transition hover:bg-neutral-300'>
          <View>
            <Text style={styles.font_mono}>{rate.from}</Text>
            <Text style={styles.font_mono}>{rate.into}</Text>
          </View>
          <View>
            <Text style={styles.font_mono}>{rate.from} to {rate.into}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              1 {rate.from} = {rate.rate.toFixed(4)} {rate.into}
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  }

  useEffect(() => {
    fetchStoredRates();
    
    if (!data) {
      getRates([...rates.favourites, ...rates.popular]).then(setData);
    }
  }, []);

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
