import { Text, View, Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

export default function ConvertScreen() {

  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('USD');

  return (
    <View style={styles.view}>
      <Pressable 
        style={styles.buttonContainer}
        onPress={() => alert('You pressed a button.')}>
          <View style={styles.buttonText}>
            <Text style={styles.text}>🇬🇧 {fromCurrency}</Text>
            <Ionicons name="chevron-down" size={14} color="#fff" />
          </View>
          <Text style={styles.text}>{amount}</Text>
      </Pressable>
      <Pressable 
        style={styles.buttonContainer}
        onPress={() => alert('You pressed a button.')}>
          <View style={styles.buttonText}>
            <Text style={styles.text}>🇬🇧 {toCurrency}</Text>
            <Ionicons name="chevron-down" size={14} color="#fff" />
          </View>
          <Text style={styles.text}>1,000</Text>
      </Pressable>
      <Text style={styles.span}>1 {fromCurrency} = 1 {toCurrency} at mid-market rate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#323233',
    padding: 24,
    gap: 24,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  span: {
    fontSize: 14, 
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#fff',
  },
  buttonText: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8
  },
});
