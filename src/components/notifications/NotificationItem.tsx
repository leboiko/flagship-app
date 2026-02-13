import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GitFork, Coins, UserPlus, AtSign } from 'lucide-react-native';
import { Text, Avatar } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { Notification } from '../../types';
import { formatTimeAgo } from '../../utils/formatters';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const ICONS = {
  fork: GitFork,
  stake: Coins,
  follow: UserPlus,
  mention: AtSign,
  message: AtSign,
};

const ICON_COLORS = {
  fork: colors.brand.secondary,
  stake: colors.brand.accent,
  follow: colors.actions.positive,
  mention: colors.signals.heartbeat,
  message: colors.text.primary,
};

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const Icon = ICONS[notification.type] || AtSign;
  const iconColor = ICON_COLORS[notification.type] || colors.text.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, !notification.read && styles.unread]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { borderColor: iconColor }]}>
        <Icon size={16} color={iconColor} />
      </View>
      <Avatar uri={notification.actor.avatar} size={36} />
      <View style={styles.content}>
        <Text variant="bodySmall" numberOfLines={2}>
          {notification.body}
        </Text>
        <Text variant="caption" color={colors.text.secondary}>
          {formatTimeAgo(notification.createdAt)}
        </Text>
      </View>
      {!notification.read && <View style={styles.dot} />}
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
  unread: {
    backgroundColor: '#FFFAF5',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: borderWidth.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand.accent,
  },
});
