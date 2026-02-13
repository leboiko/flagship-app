import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThumbsUp, ThumbsDown, GitFork } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button, Avatar, BottomSheet } from '../../src/components/ui';
import { StackHeader } from '../../src/components/stack/StackHeader';
import { StackMetrics } from '../../src/components/stack/StackMetrics';
import { VaultBreakdown } from '../../src/components/stack/VaultBreakdown';
import { StackItemList } from '../../src/components/stack/StackItemList';
import { SignalBadges } from '../../src/components/feed/SignalBadges';
import { useStackStore, useStakeStore } from '../../src/stores';
import { useHaptics } from '../../src/hooks';
import { colors, spacing, borderWidth, radius } from '../../src/theme';
import { formatTimeAgo } from '../../src/utils';

export default function StackViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { currentStack, loadStack, forkStack } = useStackStore();
  const { setPendingStake } = useStakeStore();
  const [showForkSheet, setShowForkSheet] = useState(false);

  useEffect(() => {
    if (id) loadStack(id);
  }, [id]);

  if (!currentStack) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text variant="body" color={colors.text.secondary} style={{ textAlign: 'center', marginTop: 100 }}>
          Loading stack...
        </Text>
      </View>
    );
  }

  const hasImage = !!currentStack.image;
  const totalFor = currentStack.items.reduce((sum, i) => sum + i.stakeAmount, 0);
  const totalAgainst = Math.floor(totalFor * 0.2);

  const handleAgree = () => {
    haptics.medium();
    setPendingStake({
      targetType: 'stack',
      targetId: currentStack.id,
      amount: 100,
      direction: 'for',
    });
    router.push(`/stake/stack/${currentStack.id}`);
  };

  const handleOppose = () => {
    haptics.medium();
    setPendingStake({
      targetType: 'stack',
      targetId: currentStack.id,
      amount: 100,
      direction: 'against',
    });
    router.push(`/stake/stack/${currentStack.id}`);
  };

  const handleFork = () => {
    haptics.light();
    forkStack(currentStack);
    setShowForkSheet(false);
    router.push('/(tabs)/create');
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      {hasImage && (
        <Image
          source={{ uri: currentStack.image }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={300}
        />
      )}

      {/* Light gradient overlay */}
      {hasImage && (
        <LinearGradient
          colors={[
            'rgba(245,245,240,0.7)',
            'rgba(245,245,240,0.8)',
            'rgba(245,245,240,0.9)',
            'rgba(245,245,240,0.96)',
            'rgba(245,245,240,0.99)',
          ]}
          locations={[0, 0.15, 0.3, 0.5, 0.7]}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Header */}
      <View style={{ paddingTop: insets.top }}>
        <StackHeader stack={currentStack} hasImage={hasImage} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Creator info */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <TouchableOpacity
            onPress={() => router.push(`/profile/${currentStack.creator.id}`)}
            style={styles.creatorRow}
            activeOpacity={0.7}
          >
            <Avatar uri={currentStack.creator.avatar} size={36} />
            <View>
              <Text variant="bodySmall" color={colors.text.primary} style={{ fontFamily: 'SpaceMono' }}>
                @{currentStack.creator.username}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>
                {formatTimeAgo(currentStack.createdAt)}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Description */}
        <Text variant="body" color={colors.text.secondary} style={styles.description}>
          {currentStack.description}
        </Text>

        {/* Signals */}
        <SignalBadges
          heat={currentStack.signals.heat}
          heartbeat={currentStack.signals.heartbeat}
          momentum={currentStack.signals.momentum}
        />

        {/* Metrics */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <StackMetrics
            totalStaked={currentStack.totalStaked}
            stakerCount={currentStack.stakerCount}
            forkCount={currentStack.forkCount}
            hasImage={hasImage}
          />
        </Animated.View>

        {/* Vault Breakdown */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <VaultBreakdown forAmount={totalFor} againstAmount={totalAgainst} hasImage={hasImage} />
        </Animated.View>

        {/* Items */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <StackItemList items={currentStack.items} hasImage={hasImage} />
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Fixed bottom action bar */}
      <View style={[
        styles.actionBar,
        { paddingBottom: insets.bottom + spacing.sm },
        hasImage && styles.actionBarImage,
      ]}>
        <TouchableOpacity onPress={handleAgree} style={[styles.actionButton, styles.agreeButton]}>
          <ThumbsUp size={18} color={colors.text.inverse} />
          <Text variant="button" color={colors.text.inverse}>AGREE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOppose} style={[styles.actionButton, styles.opposeButton]}>
          <ThumbsDown size={18} color={colors.text.inverse} />
          <Text variant="button" color={colors.text.inverse}>OPPOSE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowForkSheet(true)} style={styles.forkButton}>
          <GitFork size={18} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Fork bottom sheet */}
      <BottomSheet visible={showForkSheet} onClose={() => setShowForkSheet(false)} height={250}>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>Fork this Stack</Text>
        <Text variant="bodySmall" color={colors.text.secondary} style={{ marginBottom: spacing.lg }}>
          Create your own version of "{currentStack.title}" with your own ranking.
        </Text>
        <Button title="FORK & EDIT" onPress={handleFork} variant="primary" fullWidth />
        <Button
          title="SUGGEST CHANGES"
          onPress={() => setShowForkSheet(false)}
          variant="outline"
          fullWidth
          style={{ marginTop: spacing.sm }}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  description: {
    lineHeight: 22,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: borderWidth.thick,
    borderTopColor: colors.border,
  },
  actionBarImage: {
    backgroundColor: 'rgba(245,245,240,0.92)',
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
    borderWidth: borderWidth.thick,
  },
  agreeButton: {
    backgroundColor: colors.actions.positive,
    borderColor: colors.actions.positive,
  },
  opposeButton: {
    backgroundColor: colors.actions.negative,
    borderColor: colors.actions.negative,
  },
  forkButton: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
});
