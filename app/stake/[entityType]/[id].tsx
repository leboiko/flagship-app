import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Check, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Text, Button, Card } from '../../../src/components/ui';
import { StakeAmountSelector } from '../../../src/components/stake/StakeAmountSelector';
import { useStakeStore } from '../../../src/stores';
import { useHaptics } from '../../../src/hooks';
import { colors, spacing, borderWidth, radius } from '../../../src/theme';

export default function StakeScreen() {
  const { entityType, id } = useLocalSearchParams<{ entityType: string; id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { pendingStake, setAmount, setDirection, confirmStake, isConfirming, isSuccess, resetStake } = useStakeStore();
  const [holdProgress, setHoldProgress] = useState(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    if (isSuccess) {
      haptics.success();
      const timer = setTimeout(() => {
        resetStake();
        router.back();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleConfirm = () => {
    confirmStake();
  };

  const longPress = Gesture.LongPress()
    .minDuration(1500)
    .onStart(() => {
      progressValue.value = withTiming(1, { duration: 1500 });
    })
    .onEnd((_e, success) => {
      if (success) {
        runOnJS(handleConfirm)();
      }
      progressValue.value = withTiming(0, { duration: 200 });
    })
    .onFinalize(() => {
      progressValue.value = withTiming(0, { duration: 200 });
    });

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  if (isSuccess) {
    return (
      <View style={[styles.container, styles.successContainer, { paddingTop: insets.top }]}>
        <Animated.View entering={FadeInDown.springify()}>
          <View style={styles.successIcon}>
            <Check size={48} color={colors.actions.positive} strokeWidth={3} />
          </View>
          <Text variant="h2" style={styles.successText}>Staked!</Text>
          <Text variant="bodySmall" color={colors.text.secondary} style={styles.successText}>
            Your position has been recorded.
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { resetStake(); router.back(); }} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text variant="h3">Stake</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Entity info */}
        <Card>
          <Text variant="label" color={colors.text.secondary}>STAKING ON</Text>
          <Text variant="h3" style={{ marginTop: spacing.xs }}>
            {entityType?.toString().toUpperCase()} #{id?.toString().slice(-4)}
          </Text>
        </Card>

        {/* Direction toggle */}
        <View style={styles.directionRow}>
          <TouchableOpacity
            onPress={() => { setDirection('for'); haptics.light(); }}
            style={[
              styles.directionButton,
              pendingStake?.direction === 'for' && styles.directionFor,
            ]}
          >
            <ThumbsUp size={18} color={pendingStake?.direction === 'for' ? colors.text.inverse : colors.actions.positive} />
            <Text
              variant="button"
              color={pendingStake?.direction === 'for' ? colors.text.inverse : colors.actions.positive}
            >
              FOR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setDirection('against'); haptics.light(); }}
            style={[
              styles.directionButton,
              pendingStake?.direction === 'against' && styles.directionAgainst,
            ]}
          >
            <ThumbsDown size={18} color={pendingStake?.direction === 'against' ? colors.text.inverse : colors.actions.negative} />
            <Text
              variant="button"
              color={pendingStake?.direction === 'against' ? colors.text.inverse : colors.actions.negative}
            >
              AGAINST
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount selector */}
        <StakeAmountSelector
          amount={pendingStake?.amount || 100}
          onAmountChange={setAmount}
        />

        {/* Hold to confirm */}
        <View style={styles.confirmArea}>
          <Text variant="caption" color={colors.text.secondary} style={{ textAlign: 'center', marginBottom: spacing.sm }}>
            HOLD TO CONFIRM
          </Text>
          <GestureDetector gesture={longPress}>
            <View style={styles.holdButton}>
              <Animated.View style={[styles.holdProgress, progressStyle]} />
              <Text variant="button" color={colors.text.inverse} style={styles.holdButtonText}>
                {isConfirming ? 'CONFIRMING...' : 'HOLD TO STAKE'}
              </Text>
            </View>
          </GestureDetector>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.xl,
  },
  directionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  directionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  directionFor: {
    backgroundColor: colors.actions.positive,
    borderColor: colors.actions.positive,
  },
  directionAgainst: {
    backgroundColor: colors.actions.negative,
    borderColor: colors.actions.negative,
  },
  confirmArea: {
    marginTop: 'auto',
    paddingBottom: spacing.xl,
  },
  holdButton: {
    height: 56,
    borderRadius: radius.sm,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    backgroundColor: colors.text.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holdProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.brand.accent,
  },
  holdButtonText: {
    zIndex: 1,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: borderWidth.thick,
    borderColor: colors.actions.positive,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  successText: {
    textAlign: 'center',
  },
});
