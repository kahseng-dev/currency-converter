import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import CustomText from '@/components/custom-text';
import { currencies } from '@/constants/currencies';
import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore, removeStore, setStore } from '@/services/async-stores';
import { Rate } from '@/types/rate';

export default function AddFavourites() {
  const [ isDuplicate, setIsDuplicate ] = useState<boolean>(false);

  const [ from, setFrom ] = useState<string>('');
  const [ into, setInto ] = useState<string>('');
  const [ favourites, setFavourites ] = useState<Rate[]>([
    { from: 'USD', into: 'SGD', rate: 0 }, 
    { from: 'USD', into: 'GBP', rate: 0 }, 
  ]);

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const currenciesList = {
    suggested: ['USD','GBP', 'SGD', 'EUR', 'INR'],
    all: Object.keys(currencies),
  };

  const loadSuggestedCurrencies = () => {
    return (
      <FlatList
        data={currenciesList.suggested}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyClick(currency.item)}
            key={currency.index}
            className='p-2 flex flex-row gap-4 hover:bg-neutral-300'>
            <CustomText>{currency.item}</CustomText>
            <CustomText className='text-neutral-500'>{currencyName.of(currency.item)}</CustomText>
          </Pressable>
        } />
    )
  }

  const loadAllCurrencies = () => {
    return (
      <FlatList 
        data={currenciesList.all}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyClick(currency.item)}
            key={currency.index}
            className='p-2 flex flex-row gap-4 hover:bg-neutral-300'>
            <CustomText>{currency.item}</CustomText>
            <CustomText className='text-neutral-500'>{currencyName.of(currency.item)}</CustomText>
          </Pressable>
        } />
    )
  }

  const handleSwapFields = () => {
    let temp = from
    setFrom(into)
    setInto(temp)
    return
  }

  const handleCurrencyClick = (currency: string) => {
    if (!from) {
      setStore(stores.add_favourites_from, currency);
      return setFrom(currency);
    }

    if (!into) {
      setStore(stores.add_favourites_into, currency);
      return setInto(currency);
    }
  }

  const handleFieldClick = (field:string) => {
    router.push({ pathname: '/search-currency', params: { pathname: '/add-favourites', field: field } });
  }

  const handleClearField = async (field:string) => {
    if (field === 'from') {
      await removeStore(stores.add_favourites_from);
      return setFrom('');
    }

    if (field === 'into') {
      await removeStore(stores.add_favourites_into);
      return setInto('');
    }
  }

  const handleAddRate = () => {
    if (favourites.some(favourite => favourite.from === from && favourite.into === into)) {
      setIsDuplicate(true)
      
      return setTimeout(() => {
        setIsDuplicate(false)
      }, 3000)
    }

    favourites.push({ from: from, into: into, rate: 0 });
    setFavourites(favourites);
    setStore(stores.home_favourites, JSON.stringify(favourites));
    return router.dismissTo({ pathname: './' });
  }

  const fetchStoredCurrencies = async () => {
    const storedFrom = await getStore(stores.add_favourites_from);
    const storedInto = await getStore(stores.add_favourites_into);
    const storedFavourites = await getStore(stores.home_favourites);

    if (storedFrom) setFrom(storedFrom)
    if (storedInto) setInto(storedInto)
    if (storedFavourites) setFavourites(JSON.parse(storedFavourites))
  };

  useEffect(() => {
    fetchStoredCurrencies();
  }, []);

  return (
    <ScrollView className='p-4'>
      <View className='flex gap-4 mb-4'>
        <Pressable 
          onPress={() => handleFieldClick('from')}
          className='p-4 border border-neutral-300 bg-white rounded'>
          { from ? 
            <View className='flex-row justify-between items-center'>
              <CustomText className='flex gap-2 text-sm'>
                {from}
                <CustomText className='text-neutral-500'>{currencyName.of(from)}</CustomText>
              </CustomText>
              <Pressable onPress={() => handleClearField('from')}>
                <Ionicons 
                  name='close-outline'
                  size={styles.icon} />
              </Pressable>
            </View>
            :
            <CustomText className='text-neutral-500 text-sm'>From</CustomText>
          }
        </Pressable>
        <Pressable 
          onPress={() => handleFieldClick('into')}
          className='p-4 border border-neutral-300 bg-white rounded'>
          { into ? 
            <View className='flex-row justify-between items-center'>
              <CustomText className='flex gap-2 text-sm'>
                {into}
                <CustomText className='text-neutral-500'>{currencyName.of(into)}</CustomText>
              </CustomText>
              <Pressable onPress={() => handleClearField('into')}>
                <Ionicons 
                  name='close-outline'
                  size={styles.icon} />
              </Pressable>
            </View>
            :
            <CustomText className='text-neutral-500 text-sm'>To</CustomText>
          }
        </Pressable>
        <Pressable 
          onPress={handleSwapFields}
          className='absolute right-4 top-0 bottom-0 m-auto size-8 flex items-center justify-center rounded-full bg-white border border-neutral-300'>
          <Ionicons 
            name='swap-vertical-outline'
            size={styles.icon} />
        </Pressable>
      </View>
      
      { !from || !into ?
        <View className='flex gap-2'>
          <CustomText className='py-1 border-b border-neutral-300 text-neutral-700'>Suggested currencies</CustomText>
          {loadSuggestedCurrencies()}
          <CustomText className='py-1 border-b border-neutral-300 text-neutral-700'>All currencies</CustomText>
          {loadAllCurrencies()}
        </View>
        :
        <>
          <Pressable onPress={handleAddRate}>
            <CustomText className='p-4 text-center bg-white text-sm rounded border border-neutral-300 bg-transparent hover:bg-neutral-300 transition duration-300'>Add {from} to {into}</CustomText>
          </Pressable>
          <CustomText className={`${isDuplicate ? 'opacity-100' : 'opacity-0'} p-2 mt-4 gap-2 flex bg-neutral-900 text-white rounded transition duration-300`}>
            <Ionicons 
              name='alert-circle-outline'
              size={styles.icon} />
            {from} to {into} is already favourited.
          </CustomText>
        </>
      }
    </ScrollView>
  );
}
