import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from '@/constants/styles';

export default function AddFavourites() {

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const currencies = {
    suggested: ['USD','GBP', 'SGD', 'EUR', 'INR'],
    all: ['AED','ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CHF', 'CHF', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SRD', 'STD', 'SVC', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XOF', 'XPF', 'ZAR', 'ZWG'],
  };

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([...currencies.all]);
  const [changeField, setChangeField] = useState('from');

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });

  const loadSuggestedCurrencies = () => {
    return (
      <FlatList
        data={currencies.suggested}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency.item)}
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

  const loadAllCurrencies = () => {
    return (
      <FlatList 
        data={currencies.all}
        renderItem={currency => 
          <Pressable 
            onPress={() => handleCurrencyPress(currency.item)}
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

  const handleCurrencyPress = (currency: string, field?:string) => {
    if (!from && !field) {
      return setFrom(currency)
    }

    if (!to && !field) {
      return setTo(currency)
    }

    if (field) {
      switch(field) {
        case 'from':
          setFrom(currency);

        case 'to':
          setTo(currency);
      }

      return setShowSearchInput(false)
    }

    if (from && to) {
      return setShowAddButton(true)
    }

    return setShowAddButton(false)
  }

  const handleSwapFieldsPress = () => {
    let temp = from
    setFrom(to)
    setTo(temp)
    return
  }

  const handleChangeSelection = (field: string) => {
    switch(field) {
      case "to":
        setChangeField('to');
        break

      case "to":
        setChangeField('from');
        break
    }

    return setShowSearchInput(true);
  }

  const handleAddRate = () => {
    return
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
      <View className='flex gap-4'>
        { showSearchInput && 
          <View>
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
            <FlatList 
              data={searchResults}
              renderItem={currency => 
                <Pressable 
                  onPress={() => handleCurrencyPress(currency.item, changeField)}
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
          </View>
        }
        <View className={`${showSearchInput && 'hidden'} flex gap-2`}>
          <Pressable 
            onPress={() => handleChangeSelection('from')}
            className='p-4 rounded border border-neutral-300 bg-white'>
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
          <Pressable 
            onPress={() => handleChangeSelection('to')}
            className='p-4 rounded border border-neutral-300 bg-white'>
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
        { !showSearchInput && 
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
        { showAddButton &&
          <Pressable onPress={handleAddRate}>
            <Text 
              style={styles.font_mono}
              className='p-2 rounded text-center bg-blue-500 text-white'>
              Add {from} to {to}
            </Text>
          </Pressable>
        }
      </View>
    </ScrollView>
  );
}
