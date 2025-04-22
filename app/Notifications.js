import { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, ScrollView, Button, useColorMode } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import mqtt from 'mqtt/dist/mqtt';

let notificationId = 0;

const Notifications = () => {
  const { colorMode } = useColorMode();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const brokerUrl = 'wss://693754a8789c4419b4d760a2653cd86e.s1.eu.hivemq.cloud:8884/mqtt';
    const options = {
      username: 'gp4pi',
      password: 'Group4pi',
      reconnectPeriod: 1000,
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('baby_cry/classification');
      client.subscribe('baby_monitor/obstruction'); // Subscribe to the face-down detection topic
    });

    client.on('message', (topic, message) => {
      setNotifications((prev) => [
        ...prev,
        { id: notificationId++, message: message.toString() },
      ]);
    });

    return () => client.end();
  }, []);

  const clearNotifications = () => setNotifications([]);

  return (
    <Box
      flex={1}
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      padding={moderateScale(10)}
    >
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
        colorScheme={colorMode === 'dark' ? 'light' : 'primary'}
      >
        Clear All Notifications
      </Button>
      <ScrollView showsVerticalScrollIndicator>
        <VStack space={moderateScale(10)}>
          {notifications.map((notif) => (
            <Box
              key={notif.id}
              bg={colorMode === 'dark' ? 'gray.700' : 'white'}
              shadow={1}
              borderRadius={moderateScale(8)}
              padding={moderateScale(10)}
              marginBottom={moderateScale(8)}
            >
              <Text
                fontSize={moderateScale(12)}
                color={colorMode === 'dark' ? 'white' : 'primary.800'}
              >
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
