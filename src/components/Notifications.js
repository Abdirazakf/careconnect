import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Notifications = () => {
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://<pi-ip-address>:<port>/alerts');
        const data = await response.json();

        data.forEach(alert => {
          if (alert.type === 'face_obscured') {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: "Baby's face is obscured!",
            });
          } else if (alert.type === 'crying_detected') {
            Toast.show({
              type: 'warning',
              text1: 'Alert',
              text2: 'Baby is crying!',
            });
          }
        });
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
});

export default Notifications;
