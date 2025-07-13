import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStore = async(key:string, value:string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  }

  catch (e) {
    console.error(e)
  }
}

export const getStore = async(key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  }

  catch (e) {
    console.error(e)
  }
}

export const removeStore = async(key:string) => {
  try {
    return await AsyncStorage.removeItem(key);
  }

  catch (e) {
    console.error(e)
  }
}

export const mergeStore = async(key:string, value:object) => {
  try {
    return await AsyncStorage.mergeItem(key, JSON.stringify(value));
  }

  catch (e) {
    console.error(e)
  }
}

export const getMultiStores = async(keys:string[]) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values !== null ? values : null;
  }

  catch (e) {
    console.error(e)
  }
}

export const setMultiStores = async(pairs:[string, string][]) => {
  try {
    return await AsyncStorage.multiSet(pairs);
  }

  catch (e) {
    console.error(e)
  }
}