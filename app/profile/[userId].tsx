import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '../../src/components/ui';
import { ProfileHeader } from '../../src/components/profile/ProfileHeader';
import { StackLibrary } from '../../src/components/profile/StackLibrary';
import { useProfileStore } from '../../src/stores';
import { colors, spacing, borderWidth } from '../../src/theme';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { viewingUser, userStacks, isFollowing, loadProfile, toggleFollow } = useProfileStore();

  useEffect(() => {
    if (userId) loadProfile(userId);
  }, [userId]);

  if (!viewingUser) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text variant="body" color={colors.text.secondary} style={{ textAlign: 'center', marginTop: 100 }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text variant="h3" style={{ letterSpacing: 2 }}>
          @{viewingUser.username}
        </Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView>
        <ProfileHeader
          user={viewingUser}
          isFollowing={isFollowing}
          onFollow={toggleFollow}
          onRealityTunnel={() => router.push(`/reality-tunnel/${viewingUser.id}`)}
        />
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
