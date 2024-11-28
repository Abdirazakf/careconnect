import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text } from 'native-base';
import Toast from 'react-native-toast-message';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications (replace with your API call)
    const fetchNotifications = async () => {
      setNotifications([
        { id: 1, message: 'Camera detected movement.' },
        { id: 2, message: 'New update available.' },
      ]);
    };
    fetchNotifications();
  }, []);

  return (
    <Box bg="white" shadow={2} borderRadius="lg" padding="4" mb="4">
      <Heading fontSize="lg" color="primary.800" mb="2">
        Notifications
      </Heading>
      <VStack space="2">
        {notifications.map((notif) => (
          <Text key={notif.id} color="primary.700">
            {notif.message}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default Notifications;
