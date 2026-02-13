import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Flame, Heart, TrendingUp } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing } from '../../theme';

interface SignalBadgesProps {
  heat: number;
  heartbeat: number;
  momentum: number;
  compact?: boolean;
}

export function SignalBadges({ heat, heartbeat, momentum, compact = false }: SignalBadgesProps) {
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  const heartbeatStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const iconSize = compact ? 10 : 14;
  const fontSize = compact ? 10 : 13;

  return (
    <View style={[styles.container, compact && { gap: spacing.sm }]}>
      <View style={styles.signal}>
        <Flame size={iconSize} color={colors.signals.heat} />
        <Text variant="caption" color={colors.signals.heat} style={[styles.value, { fontSize }]}>
          {heat}
        </Text>
      </View>
      <Animated.View style={[styles.signal, heartbeatStyle]}>
        <Heart size={iconSize} color={colors.signals.heartbeat} fill={colors.signals.heartbeat} />
        <Text variant="caption" color={colors.signals.heartbeat} style={[styles.value, { fontSize }]}>
          {heartbeat}
        </Text>
      </Animated.View>
      <View style={styles.signal}>
        <TrendingUp size={iconSize} color={colors.signals.momentum} />
        <Text variant="caption" color={colors.signals.momentum} style={[styles.value, { fontSize }]}>
          {momentum}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  signal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontFamily: 'SpaceMono',
    fontSize: 13,
  },
});
