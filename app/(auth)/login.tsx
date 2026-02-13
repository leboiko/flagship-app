import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Text, Button } from '../../src/components/ui';
import { colors, spacing } from '../../src/theme';
import { useAuthStore } from '../../src/stores';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login, isLoading } = useAuthStore();

  return (
    <View style={styles.container}>
      {/* Grid lines background effect */}
      <View style={styles.gridOverlay}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.gridLine,
              { left: (i + 1) * (width / 9), top: 0, bottom: 0, width: 1 },
            ]}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.gridLine,
              { top: (i + 1) * (height / 13), left: 0, right: 0, height: 1 },
            ]}
          />
        ))}
      </View>

      {/* Logo area */}
      <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.logoArea}>
        <Text variant="h1" style={styles.title}>
          INTUITION
        </Text>
        <Text variant="bodySmall" color={colors.text.secondary} style={styles.subtitle}>
          Truth is not a number.{'\n'}Trust is not global.{'\n'}Meaning is local and contested.
        </Text>
      </Animated.View>

      {/* Login buttons */}
      <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.buttonArea}>
        <Text variant="label" color={colors.text.secondary} style={styles.connectLabel}>
          CONNECT TO BEGIN
        </Text>

        <Button
          title="CONTINUE WITH WALLET"
          onPress={() => login('wallet')}
          variant="secondary"
          fullWidth
          loading={isLoading}
          style={styles.button}
        />
        <Button
          title="CONTINUE WITH GOOGLE"
          onPress={() => login('google')}
          variant="outline"
          fullWidth
          style={styles.button}
        />
        <Button
          title="CONTINUE WITH APPLE"
          onPress={() => login('apple')}
          variant="outline"
          fullWidth
          style={styles.button}
        />
        <Button
          title="CONTINUE WITH EMAIL"
          onPress={() => login('email')}
          variant="ghost"
          fullWidth
          style={styles.button}
        />

        <Text variant="caption" color={colors.text.secondary} style={styles.terms}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </Animated.View>

      {/* Version tag */}
      <Animated.View entering={FadeInUp.delay(1000).duration(600)} style={styles.versionTag}>
        <Text variant="caption" color={colors.text.secondary}>
          v0.1.0-alpha // PROTOTYPE
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.04,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: colors.border,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    letterSpacing: 6,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  buttonArea: {
    gap: spacing.sm,
  },
  connectLabel: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  button: {
    marginBottom: 0,
  },
  terms: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
  versionTag: {
    position: 'absolute',
    bottom: spacing.xxl,
    alignSelf: 'center',
  },
});
