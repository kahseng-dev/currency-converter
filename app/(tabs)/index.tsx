import { Text, View, StyleSheet } from "react-native";
import { CircleFlag } from 'react-circle-flags';
import { Rate } from "@/types/rate";
import { Colors } from '@/constants/Colors';
import { get } from '@/api/frankfurter';

const circleFlagHeight = 24;

let favouriteRates: Rate[] = [
  {
    base: "USD",
    to: "SGD"
  },
  {
    base: "USD",
    to: "MYR"
  },
];

let popularRates: Rate[] = [
  {
    base: "GBP",
    to: "USD",
  },
  {
    base: "EUR",
    to: "USD",
  },
  {
    base: "USD",
    to: "INR"
  },
]

function setFavouriteRateItem(favouriteRates: Rate[]) {
  if (favouriteRates.length > 0) {
    return favouriteRates.map((rate, index) => (
      <View key={index} style={styles.ratesRow}>
        <View style={styles.rates}>
          <CircleFlag countryCode={(rate.base.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
          <CircleFlag countryCode={(rate.to.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
        </View>
        <View style={styles.rates}>
          <Text style={styles.ratesText}>{rate.base} to {rate.to}</Text>
          <Text style={styles.text}>1 {rate.base} = {1} {rate.to}</Text>
        </View>
      </View>
    ));
  }
  
  return (
    <View style={styles.rates}>
      <Text style={styles.text}>
        ⭐ You haven’t added any favourite rates yet.
      </Text>
    </View>
  );
}

function setPopularRateItem(popularRates: Rate[]) {
  return popularRates.map((rate, index) => (
    <View key={index} style={styles.ratesRow}>
      <View style={styles.rates}>
        <CircleFlag countryCode={(rate.base.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
        <CircleFlag countryCode={(rate.to.slice(0, 2).toLowerCase())} height={circleFlagHeight}></CircleFlag>
      </View>
      <View style={styles.rates}>
        <Text style={styles.ratesText}>{rate.base} to {rate.to}</Text>
        <Text style={styles.text}>1 {rate.base} = {1} {rate.to}</Text>
      </View>
    </View>
  ));
}

export default function Index() {
  return (
    <View style={styles.main}>
      <Text style={[styles.text, styles.header]}>Favourites</Text>
      <View style={styles.ratesContainer}>
        {setFavouriteRateItem(favouriteRates)}
      </View>
      <Text style={[styles.text, styles.header]}>Popular</Text>
      <View style={styles.ratesContainer}>
        {setPopularRateItem(popularRates)}
      </View>
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
    fontSize: 14,
    color: Colors.light.text,
  },
  header: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.icon,
  },
  ratesContainer: {
    flexDirection: "column",
    gap: 12,
  },
  ratesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratesRow: {
    flexDirection: "row",
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 8,
  },
  rates: {
    flexDirection: "column", 
    padding: 24,
    gap: 8,
  },
});
