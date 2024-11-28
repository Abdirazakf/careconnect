import React from 'react';
import { Box, VStack, Heading, Text } from 'native-base';
import LiveStream from './LiveStream';
import Notifications from './Notifications';
import Controls from './Controls';

const Dashboard = () => {
  return (
    <Box flex={1} bg="primary.50" padding="4">
      <VStack space="4">
        <Heading color="primary.500" fontSize="xl" mb="2">
          Dashboard
        </Heading>
        <Text fontSize="md" color="primary.800">
          Manage your live stream, notifications, and controls from here.
        </Text>
        <LiveStream />
        <Notifications />
        <Controls />
      </VStack>
    </Box>
  );
};

export default Dashboard;
