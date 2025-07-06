import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStore = async (key:string, value:string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  }

  catch (e) {
    console.error(e)
  }
}

export const getStore = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  }

  catch (e) {
    console.error(e)
  }
}