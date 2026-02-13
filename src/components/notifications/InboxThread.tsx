import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar } from '../ui';
import { colors, spacing } from '../../theme';
import { InboxThread as InboxThreadType } from '../../types';
import { formatTimeAgo } from '../../utils/formatters';

interface InboxThreadProps {
  thread: InboxThreadType;
  currentUserId: string;
  onPress: () => void;
}

export function InboxThreadItem({ thread, currentUserId, onPress }: InboxThreadProps) {
  const otherUser = thread.participants.find(p => p.id !== currentUserId) || thread.participants[0];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <Avatar uri={otherUser.avatar} size={44} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono', flex: 1 }}>
            {otherUser.displayName}
          </Text>
          <Text variant="caption" color={colors.text.secondary}>
            {formatTimeAgo(thread.updatedAt)}
          </Text>
        </View>
        <Text variant="caption" color={colors.text.secondary} numberOfLines={1}>
          {thread.lastMessage.content}
        </Text>
      </View>
      {thread.unreadCount > 0 && (
        <View style={styles.badge}>
          <Text variant="caption" color={colors.text.inverse} style={{ fontSize: 10 }}>
            {thread.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.brand.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});
