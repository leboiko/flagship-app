import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ThumbsUp, ThumbsDown, Coins, Users, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Badge } from '../../src/components/ui';
import { SignalBadges } from '../../src/components/feed/SignalBadges';
import { useStakeStore } from '../../src/stores';
import { useHaptics } from '../../src/hooks';
import { colors, spacing, borderWidth, radius } from '../../src/theme';
import { formatNumber, formatTimeAgo } from '../../src/utils';
import { getAtomById, getStacksByAtom } from '../../src/data/mock';

export default function AtomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { setPendingStake } = useStakeStore();

  const atom = id ? getAtomById(id) : undefined;
  const relatedStacks = id ? getStacksByAtom(id) : [];

  if (!atom) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text variant="body" color={colors.text.secondary} style={{ textAlign: 'center', marginTop: 100 }}>
          Atom not found
        </Text>
      </View>
    );
  }

  const hasImage = !!atom.image;

  const handleAgree = () => {
    haptics.medium();
    setPendingStake({
      targetType: 'atom',
      targetId: atom.id,
      amount: 100,
      direction: 'for',
    });
    router.push(`/stake/atom/${atom.id}`);
  };

  const handleOppose = () => {
    haptics.medium();
    setPendingStake({
      targetType: 'atom',
      targetId: atom.id,
      amount: 100,
      direction: 'against',
    });
    router.push(`/stake/atom/${atom.id}`);
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      {hasImage && (
        <Image
          source={{ uri: atom.image }}
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
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backButton,
            hasImage && { backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(0,0,0,0.12)' },
          ]}
        >
          <ArrowLeft size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text variant="label" color={colors.text.secondary}>ATOM</Text>
          <Text variant="h3" numberOfLines={1} color={colors.text.primary}>
            {atom.label}
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Type + Atom name */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <Badge
            label={atom.type.toUpperCase()}
            color={colors.text.primary}
            textColor={colors.text.inverse}
            size="sm"
          />
          <Text variant="h1" color={colors.text.primary} style={styles.atomName}>
            {atom.label}
          </Text>
          <Text variant="body" color={colors.text.secondary} style={styles.description}>
            {atom.description}
          </Text>
        </Animated.View>

        {/* Metrics */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <View style={[
            styles.metricsCard,
            hasImage && { backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.1)' },
          ]}>
            <View style={styles.metric}>
              <Coins size={18} color={colors.brand.accent} />
              <Text variant="metric" color={colors.brand.accent}>
                {formatNumber(atom.totalStaked)}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>TOTAL STAKED</Text>
            </View>
            <View style={[styles.metricDivider, hasImage && { backgroundColor: 'rgba(0,0,0,0.08)' }]} />
            <View style={styles.metric}>
              <Users size={18} color={colors.text.primary} />
              <Text variant="metric" color={colors.text.primary}>
                {formatNumber(atom.stakerCount)}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>STAKERS</Text>
            </View>
            <View style={[styles.metricDivider, hasImage && { backgroundColor: 'rgba(0,0,0,0.08)' }]} />
            <View style={styles.metric}>
              <Text variant="metric" color={colors.text.primary}>
                {relatedStacks.length}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>STACKS</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stacks containing this atom */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
            APPEARS IN {relatedStacks.length} STACKS
          </Text>
          {relatedStacks.map((stack, index) => {
            const stackItem = stack.items.find(i => i.atom.id === atom.id);
            return (
              <TouchableOpacity
                key={stack.id}
                style={[
                  styles.stackRow,
                  index < relatedStacks.length - 1 && styles.stackRowBorder,
                ]}
                activeOpacity={0.7}
                onPress={() => router.push(`/stack/${stack.id}`)}
              >
                <View style={styles.stackRowLeft}>
                  {stackItem && (
                    <View style={[
                      styles.rankBadge,
                      stackItem.rank === 1 && { backgroundColor: colors.brand.accent, borderColor: colors.brand.accent },
                    ]}>
                      <Text variant="label" color={colors.text.inverse} style={{ fontSize: 10 }}>
                        #{stackItem.rank}
                      </Text>
                    </View>
                  )}
                  <View style={styles.stackRowInfo}>
                    <Text variant="body" color={colors.text.primary} numberOfLines={1} style={{ fontFamily: 'SpaceMono', fontSize: 13 }}>
                      {stack.title}
                    </Text>
                    <Text variant="caption" color={colors.text.secondary}>
                      by @{stack.creator.username} · {formatTimeAgo(stack.createdAt)}
                    </Text>
                    <View style={styles.stackRowMeta}>
                      <Text variant="caption" color={colors.text.secondary}>
                        {formatNumber(stack.totalStaked)} staked
                      </Text>
                      <SignalBadges
                        heat={stack.signals.heat}
                        heartbeat={stack.signals.heartbeat}
                        momentum={stack.signals.momentum}
                        compact
                      />
                    </View>
                  </View>
                </View>
                <ChevronRight size={16} color={colors.text.secondary} />
              </TouchableOpacity>
            );
          })}
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
      </View>
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  atomName: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  description: {
    lineHeight: 22,
  },
  metricsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderWidth: borderWidth.thick,
    borderRadius: 8,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  metric: {
    alignItems: 'center',
    gap: 4,
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.borderLight,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  stackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
  },
  stackRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  stackRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.text.primary,
    borderWidth: borderWidth.medium,
    borderColor: colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackRowInfo: {
    flex: 1,
    gap: 2,
  },
  stackRowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
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
});
