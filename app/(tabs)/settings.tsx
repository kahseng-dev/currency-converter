import { Text, View, Pressable, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const appVersion = 0.1;

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} 
        onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>Auto</Text>
      </Pressable>
      <Text style={styles.text}>General settings</Text>
      <Text style={styles.text}>Blank</Text>
      <Text style={styles.text}>Version {appVersion}</Text>
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
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
