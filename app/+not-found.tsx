import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from '../src/components/ui';
import { colors, spacing } from '../src/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text variant="h2">404</Text>
        <Text variant="bodySmall" color={colors.text.secondary} style={{ marginTop: spacing.sm }}>
          This screen doesn't exist.
        </Text>
        <Link href="/(tabs)" style={styles.link}>
          <Text variant="button" color={colors.brand.accent}>
            GO TO FEED
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  link: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
