import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, LogOut } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Text, Button } from '../../src/components/ui';
import { ProfileHeader } from '../../src/components/profile/ProfileHeader';
import { StackLibrary } from '../../src/components/profile/StackLibrary';
import { useAuthStore } from '../../src/stores';
import { colors, spacing, borderWidth } from '../../src/theme';
import { getStacksByCreator } from '../../src/data/mock';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const userStacks = getStacksByCreator(user.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text variant="h3" style={{ letterSpacing: 2 }}>PROFILE</Text>
        <TouchableOpacity onPress={logout} style={styles.iconButton}>
          <LogOut size={18} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ProfileHeader user={user} isOwnProfile />
        <StackLibrary stacks={userStacks} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.medium,
    borderBottomColor: colors.border,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
