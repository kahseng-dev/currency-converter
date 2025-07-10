import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { stores } from '@/constants/key-stores';
import { styles } from '@/constants/styles';
import { getStore } from '@/services/async-stores';
import { getRate } from '@/services/get-rates';
import { Rate } from '@/types/rate';

export default function Convert() {
  const [rate, setRate] = useState<Rate>({ from: 'USD', into: 'SGD', rate: 0 });
  const [fromAmount, setFromAmount] = useState<string>('0.00');
  const [intoAmount, setIntoAmount] = useState<string>((Number(fromAmount) * rate.rate).toFixed(2));

  const fetchStoredCurrencies = async () => {
    const storedFrom = await getStore(stores.convert_from);
    const storedInto = await getStore(stores.convert_into);

    if (storedFrom && storedInto) { 
      setRate(previous => ({
        ...previous,
        from: storedFrom,
        into: storedInto,
      }));

      getRate({ from: storedFrom, into: storedInto, rate: 0 })
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
      setIntoAmount('0.00');
      setFromAmount('0.00');
      return;
    }

    if (isNaN(amount)) return;

    if (rate.rate === 0) {
      if (field != 'from') {
        setIntoAmount('0.00'); 
        return setFromAmount(text);
      }

      setFromAmount('0.00');
      return setIntoAmount(text);
    }

    const isDeletion = field ? text.length < fromAmount.length : text.length < intoAmount.length;
    text = autoFillTrailingZero(amount, isDeletion);

    if (field === 'from') {
      setIntoAmount((amount * rate.rate).toFixed(2));
      return setFromAmount(text);
    }

    setFromAmount((amount / rate.rate).toFixed(2));
    return setIntoAmount(text);
  }

  const handleChangeCurrency = (field:string) => {
    return router.push({ pathname: '/search-currency', params: { pathname: '/convert', field: field } });
  }

  const handleSwapFields = () => {
    setIntoAmount(fromAmount);
    setFromAmount(intoAmount);
    setRate(previous => ({
      from: previous.into,
      into: previous.from,
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
            onPress={() => handleChangeCurrency('from')}
            className='flex flex-row items-center gap-2'>
            <Text
              className='text-xl'
              style={styles.font_mono}>
              {rate.from}
            </Text>
            <Ionicons
              name='chevron-down'
              size={styles.icon} />
          </Pressable>
          <TextInput
            onChangeText={(text) => handleChangeAmount(text, 'from')}
            value={fromAmount}
            keyboardType='decimal-pad'
            maxLength={12}
            style={styles.font_mono}
            className='text-xl text-right outline-none' />
        </View>
        <View className='p-8 flex flex-row justify-between border border-neutral-300 rounded-lg bg-white'>
          <Pressable 
            onPress={() => handleChangeCurrency('into')}
            className='flex flex-row items-center gap-2'>
            <Text
              className='text-xl'
              style={styles.font_mono}>
              {rate.into}
            </Text>
            <Ionicons
              name='chevron-down'
              size={styles.icon} />
          </Pressable>
          <TextInput
            onChangeText={(text) => handleChangeAmount(text, 'into')}
            value={intoAmount}
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
        1 {rate.from} = {rate.rate} {rate.into} 
        <Text className='text-neutral-500'> at the mid-market rate</Text>
      </Text>
    </View>
  );
}
