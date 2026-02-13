import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { formatNumber, formatPercentage } from '../../utils/formatters';

interface VaultBreakdownProps {
  forAmount: number;
  againstAmount: number;
  hasImage?: boolean;
}

export function VaultBreakdown({ forAmount, againstAmount, hasImage = false }: VaultBreakdownProps) {
  const total = forAmount + againstAmount;
  const forPercent = total > 0 ? (forAmount / total) * 100 : 50;
  const forWidth = useSharedValue(0);

  const textSecondary = colors.text.secondary;
  const textDefault = colors.text.primary;
  const barBorder = hasImage ? 'rgba(0,0,0,0.1)' : colors.border;

  useEffect(() => {
    forWidth.value = withTiming(forPercent, { duration: 800 });
  }, [forPercent]);

  const forStyle = useAnimatedStyle(() => ({
    width: `${forWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Text variant="label" color={textSecondary}>VAULT BREAKDOWN</Text>
      <View style={[styles.barContainer, { borderColor: barBorder }]}>
        <Animated.View style={[styles.forBar, forStyle]} />
      </View>
      <View style={styles.labels}>
        <View style={styles.labelRow}>
          <View style={[styles.dot, { backgroundColor: colors.actions.positive }]} />
          <Text variant="caption" color={textDefault}>FOR: {formatNumber(forAmount)} ({formatPercentage(forPercent)})</Text>
        </View>
        <View style={styles.labelRow}>
          <View style={[styles.dot, { backgroundColor: colors.actions.negative }]} />
          <Text variant="caption" color={textDefault}>AGAINST: {formatNumber(againstAmount)} ({formatPercentage(100 - forPercent)})</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  barContainer: {
    height: 12,
    backgroundColor: colors.actions.negative,
    borderRadius: 6,
    borderWidth: borderWidth.medium,
    overflow: 'hidden',
  },
  forBar: {
    height: '100%',
    backgroundColor: colors.actions.positive,
    borderRadius: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
