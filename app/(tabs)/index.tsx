import { Text, View, StyleSheet } from "react-native";
import { Rate } from "../../types/rate";

function setFavouriteRateItem(favouriteRates: Rate[]) {
  if (favouriteRates.length > 0) {
    return favouriteRates.map((rate, index) => (
      <Text key={index} style={styles.text}>
        {rate.from_currency} to {rate.to_currency}: {rate.rate}
      </Text>
    ));
  }
  
  return (
    <Text style={[styles.text, styles.favourites]}>
      ⭐ You haven’t added any favourite rates yet.
    </Text>
  );
}

function setPopularRateItem(popularRates: Rate[]) {
  if (popularRates.length > 0) {
    return popularRates.map((rate, index) => (
      <View key={index} style={styles.ratesRow}>
        <View style={styles.rates}>
          <Text style={styles.text}>{rate.from_currency}</Text>
          <Text style={styles.text}>{rate.to_currency}</Text>
        </View>
        <View style={styles.rates}>
          <Text style={styles.text}>{rate.from_currency} to {rate.to_currency}</Text>
          <Text style={styles.text}>1 {rate.from_currency} = {1*rate.rate} {rate.to_currency}</Text>
        </View>
      </View>
    ))
  }
  return (
    <Text style={[styles.text, styles.favourites]}>
      ⭐ No popular rates were found.
    </Text>
  );
}

export default function Index() {
  let favouriteRates: Rate[] = [
    { 
      from_currency: 'USD',
      to_currency: 'USD',
      rate: 1.0,
    },
    { 
      from_currency: 'EUR',
      to_currency: 'EUR',
      rate: 0.85,
    },
    { 
      from_currency: 'GBP',
      to_currency: 'EUR',
      rate: 0.75,
    },
    { 
      from_currency: 'JPY',
      to_currency: 'JPY',
      rate: 110.0,
    },
  ];

  let popularRates: Rate[] = [
    { 
      from_currency: 'USD',
      to_currency: 'USD',
      rate: 1.0,
    },
    { 
      from_currency: 'EUR',
      to_currency: 'EUR',
      rate: 0.85,
    },
    { 
      from_currency: 'GBP',
      to_currency: 'EUR',
      rate: 0.75,
    },
    { 
      from_currency: 'JPY',
      to_currency: 'JPY',
      rate: 110.0,
    },
  ];

  return (
    <View style={styles.main}>
      <Text style={[styles.text, styles.header]}>Favourites</Text>
      <View style={styles.favouritesContainer}>
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
    backgroundColor: '#323233',
    padding: 24,
    gap: 24,
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  header: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  favouritesContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#fff",
    padding: 8,
    marginBottom: 8,
  },
  favouritesRow: {
    flexDirection: "row",
  },
  favourites: {
    flexDirection: "column", 
    padding: 24,
  },
  ratesContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#fff",
    padding: 8,
    marginBottom: 8,
  },
  ratesRow: {
    flexDirection: "row",
  },
  rates: {
    flexDirection: "column", 
    padding: 24,
  },
});
