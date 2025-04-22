import React from 'react';
import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';
import process from 'process';

// Polyfill setup for MQTT
global.Buffer = global.Buffer || Buffer;
global.process = global.process || process;

import { NativeBaseProvider, extendTheme, useColorMode } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// NativeBase theme config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};
const theme = extendTheme({ config });

// Color mode manager
const colorModeManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode');
      return val || 'light';
    } catch (e) {
      console.error(e);
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.error(e);
    }
  },
};

export default function RootLayout() {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <TabNavigator />
    </NativeBaseProvider>
  );
}

function TabNavigator() {
  const { colorMode } = useColorMode();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Recordings') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colorMode === 'dark' ? '#FFFFFF' : '#0088cc',
        tabBarInactiveTintColor: colorMode === 'dark' ? '#AAAAAA' : 'gray',
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? '#1A202C' : '#FFFFFF',
          borderTopColor: colorMode === 'dark' ? '#2D3748' : '#E2E8F0',
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="Notifications" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="Recordings" options={{ title: 'Recordings' }} />
      <Tabs.Screen name="Settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="VideoPlayer" options={{ tabBarButton: () => null,
        headerShown: false,
       }} />
    </Tabs>
  );
}
