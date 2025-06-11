import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';

export default function AddFavourites() {

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [currencies, setCurrencies] = useState({
    suggested: ['USD','GBP', 'SGD', 'EUR', 'INR'],
    all: ['AED','ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CHF', 'CHF', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SRD', 'STD', 'SVC', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XOF', 'XPF', 'ZAR', 'ZWG'],
  });

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });

  const loadSuggestedCurrencies = () => {
    return (
      <View className='flex gap-4'>
        {currencies.suggested.map(currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency)}
            key={currency}
            className='flex flex-row gap-4'>
            <Text style={styles.font_mono}>{currency}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              {currencyName.of(currency)}
            </Text>
          </Pressable>
        )}
      </View>
    )
  }

  const loadAllCurrencies = () => {
    return (
      <View className='flex gap-4'>
        {currencies.all.map(currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency)}
            key={currency}
            className='flex flex-row gap-4'>
            <Text style={styles.font_mono}>{currency}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              {currencyName.of(currency)}
            </Text>
          </Pressable>
        )}
      </View>
    )
  }

  const handleCurrencyPress = (currency: string) => {
    if (!from) {
      return setFrom(currency)
    }

    if (!to) {
      return setTo(currency)
    }

    return 
  }

  const handleSwapFieldsPress = () => {
    let temp = from
    setFrom(to)
    setTo(temp)
    return
  }

  return (
    <ScrollView className='p-4'>
      <View className='flex gap-4'>
        <View className='flex gap-2'>
          <Pressable className='p-4 rounded border border-neutral-300 bg-white'>
            { from ? 
              <View className='flex flex-row gap-2'>
                <Text style={styles.font_mono}>{from}</Text>
                <Text 
                  className='text-neutral-500'
                  style={styles.font_mono}>
                    {currencyName.of(from)}
                </Text>
              </View>
              :
              <Text
                className='text-neutral-500'
                style={styles.font_mono}>
                From
              </Text>
            }
          </Pressable>
          <Pressable className='p-4 rounded border border-neutral-300 bg-white'>
            { to ? 
              <View className='flex flex-row gap-2'>
                <Text style={styles.font_mono}>{to}</Text>
                <Text 
                  className='text-neutral-500'
                  style={styles.font_mono}>
                    {currencyName.of(to)}
                </Text>
              </View>
              :
              <Text
                className='text-neutral-500'
                style={styles.font_mono}>
                To
              </Text>
            }
          </Pressable>
          <Pressable 
            onPress={handleSwapFieldsPress}
            className='absolute right-4 top-0 bottom-0 m-auto size-8 flex items-center justify-center rounded-full bg-white border border-neutral-300'>
            <Ionicons 
              name='swap-vertical-outline'
              size={styles.icon} />
          </Pressable>
        </View>
        <View className={(from && to) && 'hidden'}>
          <Text 
            style={styles.font_mono}
            className='mb-4 py-1 border-b border-neutral-300 text-neutral-700'>
            Suggested currencies
          </Text>
          {loadSuggestedCurrencies()}
          <Text 
            style={styles.font_mono}
            className='my-4 py-1 border-b border-neutral-300 text-neutral-700'>
            All currencies
          </Text>
          {loadAllCurrencies()}
        </View>
        <Pressable>
          <Text 
            style={styles.font_mono}
            className='p-2 rounded text-center bg-blue-500 text-white'>
            Add {from} to {to}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
