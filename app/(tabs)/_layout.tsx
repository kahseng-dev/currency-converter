import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const iconSize = 24;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.light.tabIconDefault,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}
    >
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              color={color} 
              size={iconSize}/>
          ),
        }} 
      />
      <Tabs.Screen
        name='convert' 
        options={{
          title: 'Convert',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} 
              color={color} 
              size={iconSize}/>
          ),
        }}
      />
      <Tabs.Screen
        name='widgets' 
        options={{
          title: 'Widgets',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'grid' : 'grid-outline'} 
              color={color} 
              size={iconSize}/>
          ),
        }}
      />
      <Tabs.Screen
        name='settings' 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} 
              color={color} 
              size={iconSize}/>
          ),
        }}
      />
    </Tabs>
  );
}
