import { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { CircleFlag } from 'react-circle-flags'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { Rate } from "@/types/rate";
import { getRates } from "@/api/getRates";

const iconSize = 14;
const circleFlagHeight = 24;

let baseCurrency:string = 'GBP';
let toCurrency:string = 'USD';
let amount = 1000;

export default function Convert() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Rate>();

  useEffect(() => {
    getRates(baseCurrency, [toCurrency])
    .then((response) => {
      setData(response as Rate);
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, []);

  let rate:number = data?.rates?.[toCurrency] ?? 0;

  return (
    <View style={styles.main}>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => alert('You pressed a button.')}>
          <View style={styles.buttonText}>
            <CircleFlag countryCode={(baseCurrency.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
            <Text style={styles.text}>
              {baseCurrency}
            </Text>
            <Ionicons name="chevron-down" size={iconSize} color={Colors.light.text} />
          </View>
          <Text style={styles.text}>
            {amount.toFixed(2)}
          </Text>
      </Pressable>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => alert('You pressed a button.')}>
          <View style={styles.buttonText}>
            <CircleFlag countryCode={(toCurrency.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
            <Text style={styles.text}>
              {toCurrency}
            </Text>
            <Ionicons name="chevron-down" size={iconSize} color={Colors.light.text} />
          </View>
          <Text style={styles.text}>
            {(amount * rate).toFixed(2)}
          </Text>
      </Pressable>
      <Text style={styles.span}>
        1 {baseCurrency} = {rate} {toCurrency} at mid-market rate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    gap: 24,
  },
  text: {
    fontSize: 24,
    color: Colors.light.text,
  },
  span: {
    fontSize: 14, 
    textAlign: 'center',
    color: Colors.light.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 8,
    borderColor: Colors.light.text,
  },
  buttonText: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8
  },
});
