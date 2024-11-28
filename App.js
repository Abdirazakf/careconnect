import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaView } from 'react-native';
import Dashboard from './src/components/Dashboard';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2f9',
      100: '#c5e4f3',
      200: '#a2d4ec',
      300: '#7ac1e4',
      400: '#47a9da',
      500: '#0088cc', // Primary color
      600: '#007ab8',
      700: '#006ba1',
      800: '#005885',
      900: '#003f5e',
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Dashboard />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}