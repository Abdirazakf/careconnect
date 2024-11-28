import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, useColorMode } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const Notifications = () => {
  const { colorMode } = useColorMode();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications (replace with your API call)
    setNotifications([
      { id: 1, message: 'Camera detected movement.' },
      { id: 2, message: 'New update available.' },
    ]);
  }, []);

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <Heading
        color={colorMode === 'dark' ? 'white' : 'black'}
        fontSize={moderateScale(18)}
        marginBottom={moderateScale(10)}
      >
        Notifications
      </Heading>
      <VStack space={moderateScale(10)}>
        {notifications.map((notif) => (
          <Box
            key={notif.id}
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
    </Box>
  );
};

export default Notifications;
