import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {

  const [rates, setRates] = useState({
    favourites: [{base: 'USD', to: 'SGD'}, {base: 'USD', to: 'MYR'}],
    popular: [{base: 'GBP', to: 'USD'}, {base: 'EUR', to: 'USD'}, {base: 'USD', to: 'INR'}],
  });

  const loadFavourites = () => {
    if (rates.favourites.length === 0) {
      return (
        <View>
          <Text>⭐ You haven’t added any favourite rates yet.</Text>
        </View>
      )
    }

    return (
      <View className='flex gap-4'>
        {rates.favourites.map(rate => 
          <View className='p-4 flex flex-row gap-4 rounded bg-white shadow'>
            <View>
              <Text>{rate.base}</Text>
              <Text>{rate.to}</Text>
            </View>
            <View>
              <Text>{rate.base} to {rate.to}</Text>
              <Text>1 {rate.base} = {1} {rate.to}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }

  const loadPopular = () => {
    return (
      <View className='flex gap-4'>
        {rates.popular.map(rate => 
          <View className='p-4 flex flex-row gap-4 rounded bg-white shadow'>
            <View>
              <Text>{rate.base}</Text>
              <Text>{rate.to}</Text>
            </View>
            <View>
              <Text>{rate.base} to {rate.to}</Text>
              <Text>1 {rate.base} = {1} {rate.to}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }

  return (
    <View className='p-8 flex gap-4'>
      <Text className='text-xl border-b'>Favourites</Text>
      {loadFavourites()}
      <Text className='text-xl border-b'>Popular</Text>
      {loadPopular()}
    </View>
  );
}
