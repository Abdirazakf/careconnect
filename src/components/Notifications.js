import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Camera detected movement.' },
      { id: 2, message: 'New update available.' },
    ]);
  }, []);

  return (
    <Box flex={1} bg="primary.50" padding={moderateScale(16)}>
      <Heading color="primary.500" fontSize={moderateScale(20)} mb={moderateScale(16)}>
        Notifications
      </Heading>
      <VStack space="2">
        {notifications.map((notif) => (
          <Box key={notif.id} bg="white" shadow={1} borderRadius="lg" padding={moderateScale(12)} mb="2">
            <Text fontSize={moderateScale(14)} color="primary.800">
              {notif.message}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Notifications;
