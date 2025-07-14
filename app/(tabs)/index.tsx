import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import RateIndicator from '@/components/index/rate-indicator';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore } from '@/services/async-stores';
import { getRates } from '@/services/get-rates';
import { Rate } from '@/types/rate';

export default function Index() {
  const [ data, setData ] = useState<Rate[]>();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ rates, setRates ] = useState<{ favourites: Rate[], popular: Rate[] }>(
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

  const fetchStoredFavourites = async () => {
    const storedFavourites = await getStore(stores.home_favourites);

    if (!storedFavourites) return

    rates.favourites = JSON.parse(storedFavourites)

    setRates(rates)

    const data = await getRates([...rates.favourites, ...rates.popular]);

    if (data) {
      setData(data);
      setIsLoading(false);
    }

    return 
  }

  useEffect(() => {
    fetchStoredFavourites();
  }, []);

  return (
    <ScrollView className='bg-white'>
      <View className='p-8 flex gap-4'>
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
        { rates.favourites.length === 0 ? 
          <Text style={styles.font_mono}>
            ⭐ You haven’t added any favourite rates yet.
          </Text>
          :
          <>
          { rates.favourites.map((rate, index) => 
            <RateIndicator isLoading={isLoading} rate={rate} key={index} />
          )}
          </>
        }
        <Text 
          style={styles.font_mono}
          className='py-1 border-b border-neutral-300'>
          Popular
        </Text>
        { rates.popular.map((rate, index) => 
          <RateIndicator isLoading={isLoading} rate={rate} key={index} />
        )}
      </View>
    </ScrollView>
  );
}
