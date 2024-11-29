import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, ScrollView, Button, useColorMode } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import mqtt from 'mqtt/dist/mqtt';

// Global counter for unique notification IDs
let notificationId = 0;

const Notifications = () => {
  const { colorMode } = useColorMode();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // MQTT Connection Details
    const brokerUrl = 'wss://693754a8789c4419b4d760a2653cd86e.s1.eu.hivemq.cloud:8884/mqtt'; // HiveMQ WebSocket URL
    const options = {
      username: 'gp4pi',
      password: 'Group4pi',
      reconnectPeriod: 1000,
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('baby_cry/classification', (err) => {
        if (err) {
          console.error('Subscription error:', err);
        } else {
          console.log('Subscribed to topic: baby_cry/classification');
        }
      });
    });

    client.on('message', (topic, message) => {
      const notification = message.toString();
      console.log(`Received message on topic ${topic}: ${notification}`);

      // Use incremental counter for unique keys
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: notificationId++, message: notification }, // Increment counter for unique ID
      ]);
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    return () => {
      client.end(); // Disconnect MQTT client on unmount
    };
  }, []);

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <Heading
        color={colorMode === 'dark' ? 'white' : 'black'}
        fontSize={moderateScale(18)}
        marginBottom={moderateScale(10)}
      >
        Notifications
      </Heading>
      <Button
        onPress={clearNotifications}
        mb={moderateScale(10)}
        colorScheme="primary"
      >
        Clear
      </Button>
      <ScrollView showsVerticalScrollIndicator>
        <VStack space={moderateScale(10)}>
          {notifications.map((notif) => (
            <Box
              key={notif.id} // Incremental counter ensures unique keys
              bg="white"
              shadow={1}
              borderRadius={moderateScale(8)}
              padding={moderateScale(10)}
              marginBottom={moderateScale(8)}
            >
              <Text fontSize={moderateScale(12)} color="primary.800">
                {notif.message}
              </Text>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Notifications;
