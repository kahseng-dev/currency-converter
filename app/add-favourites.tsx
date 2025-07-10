import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { currencies } from '@/constants/currencies';
import { styles } from '@/constants/styles';
import { getStore, removeStore, setStore } from '@/services/async-stores';

export default function AddFavourites() {
  const [ from, setFrom ] = useState('');
  const [ to, setTo ] = useState('');

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });
  const currenciesList = {
    suggested: ['USD','GBP', 'SGD', 'EUR', 'INR'],
    all: Object.keys(currencies),
  };

  const storeKeyFrom:string = 'add-favourites-from';
  const storeKeyTo:string = 'add-favourites-to';

  const loadSuggestedCurrencies = () => {
    return (
      <FlatList
        data={currenciesList.suggested}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyClick(currency.item)}
            key={currency.index}
            className='p-2 flex flex-row gap-4 hover:bg-neutral-300'>
            <Text style={styles.font_mono}>{currency.item}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              {currencyName.of(currency.item)}
            </Text>
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
            <Text style={styles.font_mono}>{currency.item}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              {currencyName.of(currency.item)}
            </Text>
          </Pressable>
        }/>
    )
  }

  const handleSwapFields = () => {
    let temp = from
    setFrom(to)
    setTo(temp)
    return
  }

  const handleCurrencyClick = (currency: string) => {
    if (!from) {
      setStore(storeKeyFrom, currency);
      return setFrom(currency);
    }

    if (!to) {
      setStore(storeKeyTo, currency);
      return setTo(currency);
    }
  }

  const handleFieldClick = (field:string) => {
    router.push({ pathname: '/search-currency', params: { pathname: '/add-favourites', field: field } });
  }

  const loadSearchResults = () => {
    return 
  }

  const handleClearField = async (field:string) => {
    if (field === 'from') {
      await removeStore(storeKeyFrom);
      return setFrom('');
    }

    if (field === 'to') {
      await removeStore(storeKeyTo);
      return setTo('');
    }
  }

  const handleAddRate = () => {
    return 
  }

  const fetchStoredCurrencies = async () => {
    const storedFrom = await getStore(storeKeyFrom);
    const storedTo = await getStore(storeKeyTo);

    if (storedFrom) setFrom(storedFrom)
    if (storedTo) setTo(storedTo)
  };

  useEffect(() => {
    fetchStoredCurrencies();
  }, []);

  return (
    <ScrollView className='p-4'>
      <View className='mb-4 flex gap-4'>
        <Pressable 
          onPress={() => handleFieldClick('from')}
          className='p-4 border border-neutral-300 bg-white rounded'>
          { from ? 
            <View className='flex-row justify-between items-center'>
              <Text 
                className='flex gap-2 text-sm'
                style={styles.font_mono}>
                {from}
                <Text className='text-neutral-500'>
                  {currencyName.of(from)}
                </Text>
              </Text>
              <Pressable onPress={() => handleClearField('from')}>
                <Ionicons 
                  name='close-outline'
                  size={styles.icon} />
              </Pressable>
            </View>
            :
            <Text
              className='text-neutral-500 text-sm'
              style={styles.font_mono}>
              From
            </Text>
          }
        </Pressable>
        <Pressable 
          onPress={() => handleFieldClick('to')}
          className='p-4 border border-neutral-300 bg-white rounded'>
          { to ? 
            <View className='flex-row justify-between items-center'>
              <Text 
                className='flex gap-2 text-sm'
                style={styles.font_mono}>
                {to}
                <Text className='text-neutral-500'>
                  {currencyName.of(to)}
                </Text>
              </Text>
              <Pressable onPress={() => handleClearField('to')}>
                <Ionicons 
                  name='close-outline'
                  size={styles.icon} />
              </Pressable>
            </View>
            :
            <Text
              className='text-neutral-500 text-sm'
              style={styles.font_mono}>
              To
            </Text>
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
      { !from || !to ?
        <View className='flex gap-2'>
          <Text 
            style={styles.font_mono}
            className='py-1 border-b border-neutral-300 text-neutral-700'>
            Suggested currencies
          </Text>
          {loadSuggestedCurrencies()}
          <Text 
            style={styles.font_mono}
            className='py-1 border-b border-neutral-300 text-neutral-700'>
            All currencies
          </Text>
          {loadAllCurrencies()}
        </View>
        :
        <Pressable onPress={handleAddRate}>
          <Text 
            style={styles.font_mono}
            className='p-4 text-center bg-white text-sm rounded border border-neutral-300 bg-transparent hover:bg-neutral-300 transition duration-300'>
            Add {from} to {to}
          </Text>
        </Pressable>
      }
    </ScrollView>
  );
}
