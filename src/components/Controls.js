import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const Controls = () => {
  const sendCommand = async (command) => {
    try {
      await fetch('http://<pi-ip-address>:<port>/controls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Music</Text>
      <Button
        title="Play Lullaby"
        onPress={() => sendCommand('play_lullaby')}
        color="blue"
      />
      <Button
        title="Stop Lullaby"
        onPress={() => sendCommand('stop_lullaby')}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
});

export default Controls;
