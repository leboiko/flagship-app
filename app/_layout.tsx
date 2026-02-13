import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Inter_400Regular, Inter_300Light, Inter_700Bold } from '@expo-google-fonts/inter';
import 'react-native-reanimated';

import { useAuthStore } from '../src/stores';
import { colors } from '../src/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: Inter_400Regular,
    Inter_300Light,
    Inter_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  useProtectedRoute();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="stack/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="stake/[entityType]/[id]" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      <Stack.Screen name="share/[id]" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
      <Stack.Screen name="profile/[userId]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="reality-tunnel/[userId]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="contextual-trust" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
