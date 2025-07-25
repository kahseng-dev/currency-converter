import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import RateIndicator from '@/components/index/rate-indicator';

import CustomText from '@/components/custom-text';
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
    <ScrollView>
      <View className='p-8 flex gap-4'>
        <View className='flex flex-row justify-between'>
          <CustomText className='text-xl'>Rates</CustomText>
          <Link 
            href='/add-favourites'
            className='size-8 flex items-center justify-center rounded-full bg-neutral-300'>
            <Ionicons 
              name='add-outline'
              size={styles.icon} />
          </Link>
        </View>
        <CustomText className='py-1 border-b border-neutral-300'>Favourites</CustomText>
        { rates.favourites.length === 0 ? 
          <CustomText>⭐ You haven’t added any favourite rates yet.</CustomText>
          :
          <>
            { rates.favourites.map((rate, index) => 
              <RateIndicator 
                key={index} 
                isLoading={isLoading} 
                rate={rate} />
            )}
          </>
        }
        <CustomText className='py-1 border-b border-neutral-300'>Popular</CustomText>
        { rates.popular.map((rate, index) => 
          <RateIndicator 
            key={index}
            isLoading={isLoading} 
            rate={rate} />
        )}
      </View>
    </ScrollView>
  )
}