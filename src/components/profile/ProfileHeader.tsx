import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapPin, Calendar, Shield } from 'lucide-react-native';
import { Text, Avatar, Badge, Button } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { User } from '../../types';
import { formatNumber, formatTimeAgo } from '../../utils/formatters';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onRealityTunnel?: () => void;
}

export function ProfileHeader({ user, isOwnProfile, isFollowing, onFollow, onRealityTunnel }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Avatar uri={user.avatar} size={72} borderColor={colors.brand.accent} />
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text variant="metric">{formatNumber(user.followers)}</Text>
            <Text variant="caption" color={colors.text.secondary}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="metric">{formatNumber(user.following)}</Text>
            <Text variant="caption" color={colors.text.secondary}>Following</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="metric">{formatNumber(user.totalStaked)}</Text>
            <Text variant="caption" color={colors.text.secondary}>Staked</Text>
          </View>
        </View>
      </View>

      <View style={styles.nameArea}>
        <Text variant="h2">{user.displayName}</Text>
        <Text variant="bodySmall" color={colors.text.secondary} style={{ fontFamily: 'SpaceMono' }}>
          @{user.username}
        </Text>
      </View>

      <Text variant="bodySmall" color={colors.text.secondary} style={styles.bio}>
        {user.bio}
      </Text>

      {/* Reputation signals */}
      <View style={styles.trustRow}>
        <Shield size={14} color={colors.brand.secondary} />
        <Text variant="caption" color={colors.text.secondary}>Trusted in: </Text>
        {user.trustedContexts.map((ctx, i) => (
          <Badge
            key={ctx}
            label={ctx}
            size="sm"
            color={colors.borderLight}
            textColor={colors.text.primary}
            style={{ marginRight: 4 }}
          />
        ))}
      </View>

      {/* Reputation score */}
      <View style={styles.reputationRow}>
        <Text variant="label" color={colors.text.secondary}>REP SCORE</Text>
        <View style={styles.reputationBar}>
          <View style={[styles.reputationFill, { width: `${user.reputationScore}%` }]} />
        </View>
        <Text variant="metric" color={colors.brand.accent}>{user.reputationScore}</Text>
      </View>

      {/* Action buttons */}
      {!isOwnProfile && (
        <View style={styles.actionRow}>
          <Button
            title={isFollowing ? 'FOLLOWING' : 'FOLLOW'}
            onPress={onFollow || (() => {})}
            variant={isFollowing ? 'outline' : 'primary'}
            style={{ flex: 1 }}
          />
          <Button
            title="REALITY TUNNEL"
            onPress={onRealityTunnel || (() => {})}
            variant="secondary"
            style={{ flex: 1 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    borderBottomWidth: borderWidth.thick,
    borderBottomColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  nameArea: {
    gap: 2,
  },
  bio: {
    lineHeight: 20,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  reputationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reputationBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  reputationFill: {
    height: '100%',
    backgroundColor: colors.brand.accent,
    borderRadius: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
