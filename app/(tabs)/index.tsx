import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/constants/styles';

export default function Index() {

  const [rates, setRates] = useState({
    favourites: [{base: 'USD', to: 'SGD'}, {base: 'USD', to: 'MYR'}],
    popular: [{base: 'GBP', to: 'USD'}, {base: 'EUR', to: 'USD'}, {base: 'USD', to: 'INR'}],
  });

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
      <View className='flex gap-4'>
        {rates.favourites.map((rate, index) => 
          <Pressable
            onPress={() => handleViewDetails(rate.base, rate.to)}
            key={index}
            className='p-4 flex flex-row gap-4 rounded bg-white shadow'>
            <View>
              <Text style={styles.font_mono}>
                {rate.base}
              </Text>
              <Text style={styles.font_mono}>
                {rate.to}
              </Text>
            </View>
            <View>
              <Text style={styles.font_mono}>
                {rate.base} to {rate.to}
              </Text>
              <Text style={styles.font_mono}>
                1 {rate.base} = {1} {rate.to}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    )
  }

  const loadPopular = () => {
    return (
      <View className='flex gap-4'>
        {rates.popular.map((rate, index) => 
          <Pressable
            onPress={() => handleViewDetails(rate.base, rate.to)}
            key={index}
            className='p-4 flex flex-row gap-4 rounded bg-white shadow'>
            <View>
              <Text style={styles.font_mono}>
                {rate.base}
              </Text>
              <Text style={styles.font_mono}>
                {rate.to}
              </Text>
            </View>
            <View>
              <Text style={styles.font_mono}>
                {rate.base} to {rate.to}
              </Text>
              <Text style={styles.font_mono}>
                1 {rate.base} = {1} {rate.to}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    )
  }

  return (
    <View className='p-8 flex gap-4'>
      <Text 
        style={styles.font_mono}
        className='text-xl border-b'>Favourites</Text>
      {loadFavourites()}
      <Text 
        style={styles.font_mono}
        className='text-xl border-b'>Popular</Text>
      {loadPopular()}
    </View>
  );
}
