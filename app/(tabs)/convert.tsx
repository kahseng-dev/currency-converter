import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';
import { getStore, setStore } from '@/services/async-stores';
import { getRate } from '@/services/get-rates';
import { Rate } from '@/types/rate';

export default function Convert() {
  const [rate, setRate] = useState<Rate>({ base: 'USD', to: 'SGD', rate: 0 });
  const [baseAmount, setBaseAmount] = useState<string>('1000');
  const [toAmount, setToAmount] = useState<string>((Number(baseAmount) * rate.rate).toString());
  
  const storeKeyChangeField:string = 'convert-change-field';
  const storeKeyBase:string = 'convert-field-base';
  const storeKeyTo:string = 'convert-field-to';

  const fetchStoredCurrencies = async () => {
    const storedBase = await getStore(storeKeyBase);
    const storedTo = await getStore(storeKeyTo);

    setRate(previous => ({
      ...previous,
      base: storedBase || previous.base,
      to: storedTo || previous.to
    }));
  };

  const handleChangeBaseAmount = (text:string) => {
    text = text.replace(/[^0-9.]/g, '');
    const amount = Number(text);

    if (!text && !text.endsWith('.')) {
      setToAmount('0');
      return setBaseAmount('0');
    }

    if (isNaN(amount)) return;

    if (rate.rate === 0) {
      setToAmount('0');
      return setBaseAmount(text);
    }

    setToAmount((amount * rate.rate).toFixed(2));
    return setBaseAmount(text);
  }

  const handleChangeToAmount = (text:string) => {
    text = text.replace(/[^0-9.]/g, '');
    const amount = Number(text);

    if (!text && !text.endsWith('.')) {
      setBaseAmount('0');
      return setToAmount('0');
    }

    if (isNaN(amount)) return;

    if (rate.rate === 0) {
      setBaseAmount('0');
      return setToAmount(text);
    }

    setBaseAmount((amount / rate.rate).toFixed(2));
    return setToAmount(text);
  }

  const handleChangeCurrency = (field:string) => {
    setStore(storeKeyChangeField, field);
    return router.push({ pathname: '/choose-currency' });
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

    if (!rate.rate) {
      getRate(rate).then(setRate);
    }
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
            onChangeText={handleChangeBaseAmount}
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
            onChangeText={handleChangeToAmount}
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
