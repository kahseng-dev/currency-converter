import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
