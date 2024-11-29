import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet } from 'react-native';
import Dashboard from './src/components/Dashboard';
import Notifications from './src/components/Notifications';
import Settings from './src/components/Settings';
import { moderateScale } from 'react-native-size-matters';
import 'react-native-url-polyfill/auto'; // Polyfill for `url`
import { Buffer } from 'buffer'; // Polyfill for `Buffer`
import process from 'process'; // Polyfill for `process`

// Polyfill setup
global.Buffer = global.Buffer || Buffer;
global.process = global.process || process;
const Tab = createBottomTabNavigator();

// Theme configuration
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const theme = extendTheme({ config });

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

export default function App() {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Dashboard') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Notifications') {
                  iconName = focused ? 'notifications' : 'notifications-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                return <Ionicons name={iconName} size={moderateScale(size)} color={color} />;
              },
              tabBarActiveTintColor: '#0088cc',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
