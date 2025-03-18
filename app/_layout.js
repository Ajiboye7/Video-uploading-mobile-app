import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import GlobalProvider from '../context/GlobalProvider'

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded,error] = useFonts({
    "poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    "poppins-Bold" :require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-ExtraBold" :require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-ExtraLight" :require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "poppins-Light" :require("../assets/fonts/Poppins-Light.ttf"),
    "poppins-Medium" :require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-Regular" :require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-SemiBold" :require("../assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-Thin" :require("../assets/fonts/Poppins-Thin.ttf"),
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
   
    <GlobalProvider>
     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </ThemeProvider>
    </GlobalProvider>
   
  );
}
