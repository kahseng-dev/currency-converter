import { Text, View, Pressable, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';

const APP_VERSION:string = "0.1.0";

export default function Settings() {
  return (
    <View style={styles.main}>
      <Text style={[styles.header, styles.text]}>Dark mode</Text>
      <View>
        <Pressable style={styles.themeSelectContainer}>
          <Text style={[styles.themeOption, styles.themeOptionSelected]}>Auto</Text>
          <Text style={styles.themeOption}>On</Text>
          <Text style={styles.themeOption}>Off</Text>
        </Pressable>
      </View>
      <Text style={[styles.header, styles.text]}>General settings</Text>
      <Text style={styles.text}>Version {APP_VERSION}</Text>
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
  themeSelectContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    gap: 12,
    backgroundColor: Colors.light.cardBackground,
  },
  themeOption: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  themeOptionSelected: {
    fontWeight: 'bold',
    color: Colors.light.tint,
    backgroundColor: Colors.light.background,
  },
  buttonLabel: {
    color: Colors.light.text,
    fontSize: 24,
  },
});
