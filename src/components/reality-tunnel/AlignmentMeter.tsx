import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';

interface AlignmentMeterProps {
  value: number;
}

export function AlignmentMeter({ value }: AlignmentMeterProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(value, { duration: 1000 });
  }, [value]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  const getColor = () => {
    if (value >= 70) return colors.actions.positive;
    if (value >= 40) return colors.brand.secondary;
    return colors.actions.negative;
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text variant="label" color={colors.text.secondary}>ALIGNMENT</Text>
        <Text variant="metricLarge" color={getColor()}>{Math.round(value)}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle, { backgroundColor: getColor() }]} />
      </View>
      <View style={styles.scaleRow}>
        <Text variant="caption" color={colors.text.secondary}>DIVERGENT</Text>
        <Text variant="caption" color={colors.text.secondary}>ALIGNED</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  track: {
    height: 16,
    backgroundColor: colors.borderLight,
    borderRadius: 8,
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
