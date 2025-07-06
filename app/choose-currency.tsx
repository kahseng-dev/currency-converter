import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';
import { getStore, setStore } from '@/services/async-stores';

export default function ChooseCurrency() {

  const rate = { base: 'USD', to: 'SGD', rate: 0 };

  const currencies = {
    suggested: ['USD','GBP', 'SGD', 'EUR', 'INR'],
    all: ['AED','ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CHF', 'CHF', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SRD', 'STD', 'SVC', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XOF', 'XPF', 'ZAR', 'ZWG'],
  };

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([...currencies.all]);
  const [selectedCurrency, setSelectedCurrency] = useState(rate['base']);

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });

  const handleCurrencyPress = async (currency: string) => {
    const storeKeyChangeField = 'convert-change-field';
    const storeKeyBase = 'convert-field-base';
    const storeKeyTo = 'convert-field-to';

    setSearchInput('');
    setSelectedCurrency(currency);
    
    let field = await getStore(storeKeyChangeField);

    if (!field) {
      return router.push({ pathname: '/convert' });
    }

    if (field === 'base') {
      setStore(storeKeyBase, currency);
    }

    if (field === 'to') {
      setStore(storeKeyTo, currency);
    }

    return router.push({ pathname: '/convert' });
  }

  const loadSuggestedCurrencies = () => {
    return (
      <FlatList
        data={currencies.suggested}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency.item)}
            key={currency.index}
            className={`${currency.item === selectedCurrency && 'bg-neutral-300'} p-2 flex flex-row items-center justify-between rounded hover:bg-neutral-400`}>
            <Text style={styles.font_mono}>
              {currency.item}  <Text className='text-neutral-500'>{currencyName.of(currency.item)}</Text>
            </Text>
            { currency.item === selectedCurrency &&
              <Ionicons 
                name='checkmark-outline'
                size={styles.icon} />
            }
          </Pressable>
        }/>
    )
  }

  const loadAllCurrencies = () => {
    return (
      <FlatList 
        data={currencies.all}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency.item)}
            key={currency.index}
            className={`${currency.item === selectedCurrency && 'bg-neutral-300'} p-2 flex flex-row items-center justify-between rounded hover:bg-neutral-400`}>
            <View className='flex flex-row gap-4'>
              <Text style={styles.font_mono}>
                {currency.item}  <Text className='text-neutral-500'>{currencyName.of(currency.item)}</Text>
              </Text>
            </View>
            { currency.item === selectedCurrency &&
              <Ionicons 
                name='checkmark-outline'
                size={styles.icon} />
            }
          </Pressable>
        }/>
    )
  }

  const handleSearch = (input:string) => {
    setSearchInput(input)

    if (!input.trim()) {
      return setSearchResults([...currencies.all])
    }

    let filteredResults = 
      currencies.all
      .filter(currency => currency
        .toLowerCase()
        .includes(
          input
          .toLocaleLowerCase()
        ))
    
    return setSearchResults(filteredResults)
  }

  return (
    <ScrollView className='p-4'>
      <View className='flex flex-row gap-2 p-4 mb-4 rounded border border-neutral-300 bg-white'>
        <Ionicons 
          name='search-outline'
          size={styles.icon} />
        <TextInput 
          onChangeText={input => handleSearch(input)}
          placeholder='Type a currency'
          value={searchInput}
          style={styles.font_mono}
          className='w-full placeholder:text-neutral-500 outline-none' />
      </View>
      { searchInput != '' ?
        <FlatList 
          data={searchResults}
          renderItem={ currency => 
            <Pressable 
              onPress={() => handleCurrencyPress(currency.item)}
              key={currency.index}
              className={`${currency.item === selectedCurrency && 'bg-neutral-300'} p-2 flex flex-row items-center justify-between rounded hover:bg-neutral-400`}>
              <View className='flex flex-row gap-4'>
                <Text style={styles.font_mono}>
                  {currency.item}  <Text className='text-neutral-500'>{currencyName.of(currency.item)}</Text>
                </Text>
              </View>
              { currency.item === selectedCurrency &&
                <Ionicons 
                  name='checkmark-outline'
                  size={styles.icon} />
              }
            </Pressable>
          }/>
        :
        <View>
          <Text 
            style={styles.font_mono}
            className='mb-2 py-1 border-b border-neutral-300 text-neutral-700'>
            Suggested currencies
          </Text>
          {loadSuggestedCurrencies()}
          <Text 
            style={styles.font_mono}
            className='mt-4 mb-2 py-1 border-b border-neutral-300 text-neutral-700'>
            All currencies
          </Text>
          {loadAllCurrencies()}
        </View>
      }
    </ScrollView>
  );
}
