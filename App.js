import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Ionicons } from 'react-native-vector-icons';
import Dashboard from './src/components/Dashboard';
import Notifications from './src/components/Notifications';

const Tab = createBottomTabNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2f9',
      500: '#0088cc',
      800: '#005885',
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
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
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: '16@ms',
    backgroundColor: '#f9f9f9',
  },
});
