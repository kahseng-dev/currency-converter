import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { styles } from '@/constants/styles';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'}
              size={styles.icon} />
          ),
        }} />
      <Tabs.Screen
        name='convert' 
        options={{
          title: 'Convert',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} 
              size={styles.icon} />
          ),
        }} />
      <Tabs.Screen
        name='widgets' 
        options={{
          title: 'Widgets',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'grid' : 'grid-outline'} 
              size={styles.icon} />
          ),
        }} />
      <Tabs.Screen
        name='settings' 
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} 
              size={styles.icon} />
          ),
        }} />
    </Tabs>
  );
}