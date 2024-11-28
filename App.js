import React from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView, ScrollView } from 'react-native';
import Dashboard from 'components/Dashboard';

function App() {
  return (
    <GluestackUIProvider mode="light"><SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Dashboard />
        </ScrollView>
      </SafeAreaView></GluestackUIProvider>
  );
}

export default App;
