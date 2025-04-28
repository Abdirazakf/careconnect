// app/Recordings.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  Box,
  Heading,
  FlatList,
  Spinner,
  Text,
  Button,
  HStack,
  Pressable,
  useColorMode
} from 'native-base';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const BUCKET_NAME = 'videouploads2552';
const REGION      = 'us-east-1';
const PREFIX      = '';  // set to 'videos/' if your files are in a subfolder
const LIST_URL    = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com?list-type=2${PREFIX?`&prefix=${PREFIX}`:''}`;

// Convert filenames like "2025-04-22_07-39-32-514942.mp4" into "MM/DD/YYYY H:MM AM/PM"
function formatFilename(filename) {
  // remove extension and trailing ID
  const base = filename.replace(/\.mp4$/i, '');
  const withoutId = base.replace(/-\d+$/, '');
  const [datePart, timePart] = withoutId.split('_');
  if (!datePart || !timePart) return filename;

  const [year, month, day] = datePart.split('-');
  const [h, m] = timePart.split('-');
  let hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const displayMinute = minute.toString().padStart(2, '0');

  return `${month}/${day}/${year} ${displayHour}:${displayMinute} ${suffix}`;
}

export default function Recordings() {
  const { colorMode } = useColorMode();
  const router       = useRouter();
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState();

  useEffect(() => {
    let mounted = true;

    async function fetchList() {
      try {
        const xml = await fetch(LIST_URL).then(r => r.text());
        const keys = [];
        xml.replace(/<Key>(.*?)<\/Key>/g, (_, key) => {
          if (!key.endsWith('/')) keys.push(key);
          return '';
        });

        const list = keys.map(key => {
          const rawName = key.split('/').pop();
          return {
            key,
            name: formatFilename(rawName),
            url:  `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`
          };
        });

        if (mounted) {
          setVideos(list);
          setError(undefined);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchList();
    const intervalId = setInterval(fetchList, 2 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <Spinner size="lg" />;
  if (error)   return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box
      flex={1}
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      p={4}
      paddingTop={verticalScale(40)}
    >
      <Heading mb={4} color={colorMode === 'dark' ? 'white' : 'black'}>
        Recordings
      </Heading>

      <HStack mb={4} justifyContent="flex-end">
        <Button onPress={() => setVideos([])}>
          Clear All Videos
        </Button>
      </HStack>

      <FlatList
        data={videos}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/VideoPlayer', params: { key: item.key } })
            }
          >
            <Box
              mb={3}
              p={4}
              bg={colorMode === 'dark' ? 'gray.700' : 'white'}
              borderRadius={8}
              shadow={1}
            >
              <Text
                color={colorMode === 'dark' ? 'white' : 'black'}
                fontSize="md"
              >
                {item.name}
              </Text>
            </Box>
          </Pressable>
        )}
      />
    </Box>
  );
}
