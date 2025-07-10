import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { currencies } from '@/constants/currencies';
import { styles } from '@/constants/styles';

export default function SearchCurrency() {
  const { field } = useLocalSearchParams<{field:string}>();

  const currencyName = new Intl.DisplayNames(['en'], { type: 'currency' });

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, string>>(currencies);
  
  const handleCurrencyClick = (currencyCode:string) => {
    return router.push({ pathname: '/add-favourites', params: { field, currencyCode } });
  }
  
  const handleSearch = (text:string) => {
    setSearch(text)

    if (!text.trim()) return setSearchResults(currencies)

    let filteredResults = Object.fromEntries(
        Object.entries(currencies).filter(([code, name]) =>
          code.toLowerCase().includes(text.toLowerCase()) ||
          name.toLowerCase().includes(text.toLowerCase())
        )
    );
    
    return setSearchResults(filteredResults);
  }

  const loadSearchResults = () => {
    return (
      <FlatList
        data={Object.keys(searchResults)}
        renderItem={currencyCode => 
          <Pressable 
            onPress={() => handleCurrencyClick(currencyCode.item)}
            key={currencyCode.index}
            className='p-2 flex flex-row gap-4 hover:bg-neutral-300'>
            <Text style={styles.font_mono}>{currencyCode.item}</Text>
            <Text 
              className='text-neutral-500'
              style={styles.font_mono}>
              {currencyName.of(currencyCode.item)}
            </Text>
          </Pressable>
        }/>
    )
  }

  return (
    <ScrollView className='p-4'>
      <View className='flex gap-4'>
        <View className='flex-row gap-2 p-4 rounded border border-neutral-300 bg-white'>
            <Ionicons 
                name='search-outline'
                size={styles.icon} />
            <TextInput 
                onChangeText={handleSearch}
                placeholder='Type a currency'
                value={search}
                style={styles.font_mono}
                className='w-full placeholder:text-neutral-500 outline-none' />
        </View>
        {loadSearchResults()}
      </View>
    </ScrollView>
  );
}
