import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Users, GitFork, Coins } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { formatNumber } from '../../utils/formatters';

interface StackMetricsProps {
  totalStaked: number;
  stakerCount: number;
  forkCount: number;
  hasImage?: boolean;
}

export function StackMetrics({ totalStaked, stakerCount, forkCount, hasImage = false }: StackMetricsProps) {
  const bg = hasImage ? 'rgba(255,255,255,0.75)' : colors.surface;
  const border = hasImage ? 'rgba(0,0,0,0.1)' : colors.border;
  const divider = hasImage ? 'rgba(0,0,0,0.08)' : colors.borderLight;

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
      <View style={styles.metric}>
        <Coins size={16} color={colors.brand.accent} />
        <Text variant="metric" color={colors.brand.accent}>
          {formatNumber(totalStaked)}
        </Text>
        <Text variant="caption" color={colors.text.secondary}>
          STAKED
        </Text>
      </View>
      <View style={[styles.divider, { backgroundColor: divider }]} />
      <View style={styles.metric}>
        <Users size={16} color={colors.text.primary} />
        <Text variant="metric" color={colors.text.primary}>
          {formatNumber(stakerCount)}
        </Text>
        <Text variant="caption" color={colors.text.secondary}>
          STAKERS
        </Text>
      </View>
      <View style={[styles.divider, { backgroundColor: divider }]} />
      <View style={styles.metric}>
        <GitFork size={16} color={colors.text.primary} />
        <Text variant="metric" color={colors.text.primary}>
          {formatNumber(forkCount)}
        </Text>
        <Text variant="caption" color={colors.text.secondary}>
          FORKS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderWidth: borderWidth.thick,
    borderRadius: 8,
  },
  metric: {
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: 40,
  },
});
