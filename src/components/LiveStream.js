import React, { useRef } from 'react';
import { Video } from 'expo-av';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LiveStream = () => {
  const videoRef = useRef(null);

  const sendCommand = async (command) => {
    try {
      await fetch('http://10.0.0.145:5000/controls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      Alert.alert('Success', `${command} command sent successfully!`);
    } catch (error) {
      console.error('Error sending command:', error);
      Alert.alert('Error', 'Failed to send command. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.heading}>CareConnect Live Stream</Text>

      {/* Video Section */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: 'http://3.95.181.205:5000/hls/output.m3u8' }} // Replace with your server's URL
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(status) => {
           if (status.didJustFinish) {
            // Replay the video if it stops
            videoRef.current.playAsync();
          }
        }}
          onError={(error) => console.error('Video error:', error)}
        />
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={() => sendCommand('play_lullaby')}
        >
          <Text style={styles.buttonText}>Play Lullaby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={() => sendCommand('stop_lullaby')}
        >
          <Text style={styles.buttonText}>Stop Lullaby</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background for contrast
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  playButton: {
    backgroundColor: '#4CAF50', // Green color for Play
  },
  stopButton: {
    backgroundColor: '#F44336', // Red color for Stop
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LiveStream;
