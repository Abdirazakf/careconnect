import React from 'react';
import { VStack, Box, Heading, Switch, Text, useColorMode } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <Heading
        color={colorMode === 'dark' ? 'white' : 'black'}
        fontSize={moderateScale(18)}
        marginBottom={moderateScale(12)}
      >
        Settings
      </Heading>
      <VStack space={moderateScale(12)}>
        {/* Dark Mode Toggle */}
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text color={colorMode === 'dark' ? 'white' : 'black'} fontSize={moderateScale(14)}>
            Dark Mode
          </Text>
          <Switch
            isChecked={colorMode === 'dark'}
            onToggle={toggleColorMode}
            accessibilityLabel="toggle-dark-mode"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Settings;