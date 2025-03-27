import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    DMSans: require('./assets/fonts/DMSans-Regular.ttf'),
    DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StackNavigator />
  );
};