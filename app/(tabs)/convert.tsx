import { useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { CircleFlag } from 'react-circle-flags'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { RateAPI } from '@/types/RateAPI';
import { getRates } from '@/api/getRates';

const iconSize = 14;
const circleFlagHeight = 24;

let baseCurrency:string = 'GBP';
let toCurrency:string = 'USD';
let amount:number = 1000;

export default function Convert() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RateAPI>();

  useEffect(() => {
    getRates(baseCurrency, [toCurrency])
    .then((response) => {
      setData(response as RateAPI);
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, []);

  let rate:number = data?.rates?.[toCurrency] ?? 0;

  let baseCurrencyCountryCode = baseCurrency.slice(0, 2).toLowerCase();
  let toCurrencyCountryCode = toCurrency.slice(0, 2).toLowerCase();
  let baseAmountText = amount.toFixed(2);
  let toAmountText = (amount * rate).toFixed(2);
  let detailedText = `1 ${baseCurrency} = ${rate} ${toCurrency} at mid-market rate`;

  return (
    <View style={styles.main}>
      <Pressable style={styles.buttonContainer}>
          <View style={styles.buttonText}>
            <CircleFlag 
              countryCode={baseCurrencyCountryCode} 
              height={circleFlagHeight}/>
            <Text style={styles.text}>
              {baseCurrency}
            </Text>
            <Ionicons 
              name='chevron-down' 
              size={iconSize} 
              color={Colors.light.text}/>
          </View>
          <Text style={styles.text}>
            {baseAmountText}
          </Text>
      </Pressable>
      <Pressable style={styles.buttonContainer}>
          <View style={styles.buttonText}>
            <CircleFlag 
              countryCode={toCurrencyCountryCode} 
              height={circleFlagHeight}/>
            <Text style={styles.text}>
              {toCurrency}
            </Text>
            <Ionicons 
              name='chevron-down' 
              size={iconSize} 
              color={Colors.light.text} 
            />
          </View>
          <Text style={styles.text}>
            {toAmountText}
          </Text>
      </Pressable>
      <Text style={styles.span}>
        {detailedText}
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
