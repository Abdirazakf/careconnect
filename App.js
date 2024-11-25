import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Dashboard from 'components/Dashboard';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Dashboard />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
