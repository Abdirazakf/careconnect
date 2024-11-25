import React from 'react';
import { View, Text } from 'react-native';
import LiveStream from './LiveStream';
import Notifications from './Notifications';
import Controls from './Controls';

const Dashboard = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Care Connect</Text>
      <LiveStream />
      <Notifications />
      <Controls />
    </View>
  );
};

export default Dashboard;
