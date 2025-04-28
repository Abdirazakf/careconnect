import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, HStack, Button, useColorMode } from 'native-base';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import { WebView } from 'react-native-webview';
import mqtt from 'mqtt/dist/mqtt';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [statusColor, setStatusColor] = useState('gray.400'); // default neutral colour

  // ———————————————————————————————————————————
  // Subscribe to baby_monitor/status and map incoming text → theme colours
  // ———————————————————————————————————————————
  useEffect(() => {
    const brokerUrl = 'wss://693754a8789c4419b4d760a2653cd86e.s1.eu.hivemq.cloud:8884/mqtt';
    const options = {
      username: 'gp4pi',
      password: 'Group4pi',
      reconnectPeriod: 1000,
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker (status)');
      client.subscribe('baby_monitor/status');
    });

    client.on('message', (_topic, payload) => {
      const msg = payload.toString().trim().toLowerCase();
      const map = {
        green: 'green.400',
        red: 'red.500',
        yellow: 'yellow.400',
      };
      setStatusColor(map[msg] ?? 'gray.400'); // fall back to neutral grey
    });

    return () => client.end();
  }, []);

  const sendCommand = async (command) => {
    try {
      await fetch('http://3.95.181.205:5000/controls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      alert(`${command} command sent successfully!`);
    } catch (error) {
      alert('Failed to send command. Please try again.');
    }
  };

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <VStack space={moderateScale(12)}>
        <Heading
          color={colorMode === 'dark' ? 'white' : 'black'}
          fontSize={moderateScale(18)}
          marginBottom={moderateScale(10)}
          paddingTop={verticalScale(40)}
        >
          Dashboard
        </Heading>
        <Text fontSize={moderateScale(12)} color={colorMode === 'dark' ? 'gray.300' : 'gray.800'}>
          Manage your live stream and controls from here.
        </Text>

        {/* ——— Live Stream Section ——— */}
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          shadow={2}
          borderRadius={moderateScale(8)}
          padding={moderateScale(10)}
          alignItems="center"
        >
          <Heading
            fontSize={moderateScale(14)}
            color={colorMode === 'dark' ? 'white' : 'primary.800'}
            marginBottom={moderateScale(8)}
          >
            Live Stream
          </Heading>

          {/* Embed the stream via WebView */}
          <Box borderWidth={1} borderColor="gray.300" width="100%" height={moderateScale(200)}>
            <WebView
              source={{ uri: 'http://192.168.137.178:8889/cam_with_audio/' }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
            />
          </Box>

          {/* Status indicator */}
          <Box mt={moderateScale(8)} alignItems="flex-end" width="100%" paddingRight={moderateScale(10)}>
            <Box w={4} h={4} borderRadius={999} bg={statusColor} />
            <Text fontSize={moderateScale(10)} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'} >
              Baby status
            </Text>
          </Box>
        </Box>

        {/* ——— Controls Section ——— */}
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          shadow={2}
          borderRadius="lg"
          padding={moderateScale(16)}
        >
          <Heading
            fontSize={moderateScale(14)}
            color={colorMode === 'dark' ? 'white' : 'primary.800'}
            marginBottom={moderateScale(8)}
          >
            Controls
          </Heading>
          <HStack space={moderateScale(16)} justifyContent="center">
            <Button
              colorScheme={colorMode === 'dark' ? 'light' : 'primary'}
              padding={moderateScale(12)}
              fontSize={moderateScale(14)}
              onPress={() => sendCommand('play_lullaby')}
            >
              Play Lullaby
            </Button>
            <Button
              colorScheme={colorMode === 'dark' ? 'light' : 'secondary'}
              padding={moderateScale(12)}
              fontSize={moderateScale(14)}
              onPress={() => sendCommand('stop_lullaby')}
            >
              Stop Lullaby
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

const styles = ScaledSheet.create({});

export default Dashboard;
