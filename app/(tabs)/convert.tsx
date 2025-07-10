import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';
import { getStore } from '@/services/async-stores';
import { getRate } from '@/services/get-rates';
import { Rate } from '@/types/rate';

export default function Convert() {
  const [rate, setRate] = useState<Rate>({ base: 'USD', to: 'SGD', rate: 0 });
  const [baseAmount, setBaseAmount] = useState<string>('0.00');
  const [toAmount, setToAmount] = useState<string>((Number(baseAmount) * rate.rate).toFixed(2));
  
  const storeKeyBase:string = 'convert-field-base';
  const storeKeyTo:string = 'convert-field-to';

  const fetchStoredCurrencies = async () => {
    const storedBase = await getStore(storeKeyBase);
    const storedTo = await getStore(storeKeyTo);

    if (storedBase && storedTo) { 
      setRate(previous => ({
        ...previous,
        base: storedBase,
        to: storedTo,
      }));

      getRate({ base: storedBase, to: storedTo, rate: 0 })
        .then((fetchedRate) => {
          setRate(previous => ({
            ...previous,
            rate: fetchedRate.rate
          }));
      });
    }
  };

  const autoFillTrailingZero = (amount:number, isDeletion:boolean) => {
    if (!isDeletion) {
      return (amount * 10).toFixed(2);
    }
    
    return (amount / 10).toFixed(2);
  }

  const handleChangeAmount = (text:string, field:string) => {
    text = text.replace(/[^0-9.]/g, '');
    const amount = Number(text);

    if (!text) {
      setToAmount('0.00');
      setBaseAmount('0.00');
      return;
    }

    if (isNaN(amount)) return;

    if (rate.rate === 0) {
      if (field != 'base') {
        setBaseAmount(text);
        return setToAmount('0.00');
      }

      setBaseAmount('0.00');
      return setToAmount(text);
    }

    const isDeletion = field ? text.length < baseAmount.length : text.length < toAmount.length;
    text = autoFillTrailingZero(amount, isDeletion);

    if (field === 'base') {
      setToAmount((amount * rate.rate).toFixed(2));
      return setBaseAmount(text);
    }

    setBaseAmount((amount / rate.rate).toFixed(2));
    return setToAmount(text);
  }

  const handleChangeCurrency = (field:string) => {
    return router.push({ pathname: '/search-currency', params: { pathname: '/convert', field: field } });
  }

  const handleSwapFields = () => {
    setToAmount(baseAmount);
    setBaseAmount(toAmount);
    setRate(previous => ({
      base: previous.to,
      to: previous.base,
      rate: previous.rate
    }));
  }

  useEffect(() => {
    fetchStoredCurrencies();
  }, []);

  return (
    <View className='p-8 relative flex gap-4'>
      <View className='flex gap-4'>
        <View className='p-8 group flex flex-row justify-between border border-neutral-300 rounded-lg bg-white'>
          <Pressable
            onPress={() => handleChangeCurrency('base')}
            className='flex flex-row items-center gap-2'>
            <Text
              className='text-xl'
              style={styles.font_mono}>
              {rate.base}
            </Text>
            <Ionicons
              name='chevron-down'
              size={styles.icon} />
          </Pressable>
          <TextInput
            onChangeText={(text) => handleChangeAmount(text, 'base')}
            value={baseAmount}
            keyboardType='decimal-pad'
            maxLength={12}
            style={styles.font_mono}
            className='text-xl text-right outline-none' />
        </View>
        <View className='p-8 flex flex-row justify-between border border-neutral-300 rounded-lg bg-white'>
          <Pressable 
            onPress={() => handleChangeCurrency('to')}
            className='flex flex-row items-center gap-2'>
            <Text
              className='text-xl'
              style={styles.font_mono}>
              {rate.to}
            </Text>
            <Ionicons
              name='chevron-down'
              size={styles.icon} />
          </Pressable>
          <TextInput
            onChangeText={(text) => handleChangeAmount(text, 'to')}
            value={toAmount}
            keyboardType='decimal-pad'
            maxLength={12}
            style={styles.font_mono}
            className='text-xl text-right outline-none' />
        </View>
        <Pressable 
          onPress={handleSwapFields}
          className='absolute right-8 top-0 bottom-0 m-auto size-8 flex items-center justify-center rounded-full bg-white border border-neutral-300'>
          <Ionicons 
            name='swap-vertical-outline'
            size={styles.icon} />
        </Pressable>
      </View>
      <Text 
        className='py-2 text-center bg-neutral-300 rounded'
        style={styles.font_mono}>
        1 {rate.base} = {rate.rate} {rate.to} 
        <Text className='text-neutral-500'> at the mid-market rate</Text>
      </Text>
    </View>
  );
}
