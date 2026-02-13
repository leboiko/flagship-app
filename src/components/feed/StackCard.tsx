import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { GitFork, Users, ArrowRight, Layers } from 'lucide-react-native';
import { Text, Avatar, Badge } from '../ui';
import { SignalBadges } from './SignalBadges';
import { SocialContext } from './SocialContext';
import { colors, spacing, borderWidth, radius } from '../../theme';
import { Stack, StackItem } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { useHaptics } from '../../hooks';
import { useDoubleTap } from '../../hooks';
import { useFeedStore } from '../../stores';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 85;
const CARD_HEIGHT = SCREEN_HEIGHT - TAB_BAR_HEIGHT;
const ITEM_CARD_HEIGHT = 56;
const ITEM_OVERLAP = 12;

interface StackCardProps {
  stack: Stack;
  topInset?: number;
}

function ItemCard({
  item,
  index,
  total,
  hasImage,
}: {
  item: StackItem;
  index: number;
  total: number;
  hasImage: boolean;
}) {
  const isTop = index === 0;
  const offsetX = index * 3;
  const opacity = 1 - index * 0.08;

  return (
    <Animated.View
      entering={FadeInUp.delay(100 + index * 80).duration(350).springify().damping(18)}
      style={[
        styles.itemCard,
        {
          marginTop: index === 0 ? 0 : -ITEM_OVERLAP,
          marginLeft: offsetX,
          marginRight: offsetX,
          opacity,
          zIndex: total - index,
          backgroundColor: hasImage
            ? `rgba(255, 255, 255, ${0.88 - index * 0.03})`
            : colors.surface,
          borderColor: hasImage
            ? `rgba(0, 0, 0, ${0.1 + index * 0.02})`
            : colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.rankCircle,
          isTop && { backgroundColor: colors.brand.accent, borderColor: colors.brand.accent },
          !isTop && { backgroundColor: colors.text.primary, borderColor: colors.text.primary },
        ]}
      >
        <Text variant="label" color={colors.text.inverse} style={{ fontSize: 11 }}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.itemInfo}>
        <Text
          variant="body"
          numberOfLines={1}
          color={colors.text.primary}
          style={styles.itemLabel}
        >
          {item.atom.label}
        </Text>
        <Text
          variant="caption"
          color={colors.text.secondary}
        >
          {formatNumber(item.stakeAmount)} staked · {formatNumber(item.stakerCount)} stakers
        </Text>
      </View>

      <View style={styles.stakeBar}>
        <View
          style={[
            styles.stakeBarFill,
            {
              width: `${Math.max(20, (item.stakeAmount / (item.stakeAmount * 1.3)) * 100)}%`,
              backgroundColor: isTop ? colors.brand.accent : colors.brand.secondary,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

export function StackCard({ stack, topInset = 140 }: StackCardProps) {
  const router = useRouter();
  const haptics = useHaptics();
  const likeStack = useFeedStore((s) => s.likeStack);

  const handleDoubleTap = useDoubleTap(() => {
    haptics.medium();
    likeStack(stack.id);
  });

  const navigateToStack = () => {
    router.push(`/stack/${stack.id}`);
  };

  const navigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  const hasImage = !!stack.image;
  const displayItems = stack.items.slice(0, 4);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleDoubleTap}
      style={styles.container}
    >
      {/* Background image */}
      {hasImage && (
        <Image
          source={{ uri: stack.image }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={300}
        />
      )}

      {/* Light gradient overlay — keeps the light theme feel */}
      {hasImage && (
        <LinearGradient
          colors={[
            'rgba(245,245,240,0.5)',
            'rgba(245,245,240,0.25)',
            'rgba(245,245,240,0.7)',
            'rgba(245,245,240,0.92)',
            'rgba(245,245,240,0.98)',
          ]}
          locations={[0, 0.15, 0.38, 0.6, 0.8]}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <Animated.View entering={FadeIn.duration(400)} style={[styles.content, { paddingTop: topInset + spacing.sm }]}>
        {/* Top area: badge + social context */}
        <View style={styles.topArea}>
          <View style={styles.topRow}>
            <Badge
              label={stack.category.toUpperCase()}
              color={hasImage ? 'rgba(255,255,255,0.9)' : colors.text.primary}
              textColor={hasImage ? colors.text.primary : colors.text.inverse}
              size="sm"
              style={hasImage ? { borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1.5 } : undefined}
            />
            <View style={[styles.itemCountBadge, hasImage && styles.itemCountBadgeImage]}>
              <Layers size={12} color={hasImage ? colors.text.primary : colors.text.secondary} />
              <Text
                variant="caption"
                color={hasImage ? colors.text.primary : colors.text.secondary}
                style={{ fontFamily: 'SpaceMono' }}
              >
                {stack.items.length}
              </Text>
            </View>
          </View>

          {stack.socialContext && (
            <SocialContext
              context={stack.socialContext}
              onPressUser={() => navigateToProfile(stack.socialContext!.user.id)}
              hasImage={hasImage}
            />
          )}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Title + description above the stack */}
        <View style={styles.titleArea}>
          <Text
            variant="h1"
            numberOfLines={2}
            color={colors.text.primary}
            style={styles.title}
          >
            {stack.title}
          </Text>
          <Text
            variant="bodySmall"
            color={hasImage ? colors.text.primary : colors.text.secondary}
            numberOfLines={2}
            style={styles.description}
          >
            {stack.description}
          </Text>
        </View>

        {/* THE STACK — overlapping item cards */}
        <View style={styles.stackContainer}>
          {displayItems.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              index={index}
              total={displayItems.length}
              hasImage={hasImage}
            />
          ))}
          {stack.items.length > 4 && (
            <View style={[styles.moreHint, { marginLeft: displayItems.length * 3, marginRight: displayItems.length * 3 }]}>
              <Text
                variant="caption"
                color={colors.text.secondary}
                style={{ textAlign: 'center', fontFamily: 'SpaceMono' }}
              >
                +{stack.items.length - 4} more
              </Text>
            </View>
          )}
        </View>

        {/* Bottom area: signals + stats + creator */}
        <View style={[styles.bottomArea, hasImage && styles.bottomAreaImage]}>
          <View style={styles.bottomTopRow}>
            <SignalBadges
              heat={stack.signals.heat}
              heartbeat={stack.signals.heartbeat}
              momentum={stack.signals.momentum}
            />
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Users size={12} color={colors.text.secondary} />
                <Text variant="caption" color={colors.text.secondary}>
                  {formatNumber(stack.stakerCount)}
                </Text>
              </View>
              <View style={styles.stat}>
                <GitFork size={12} color={colors.text.secondary} />
                <Text variant="caption" color={colors.text.secondary}>
                  {formatNumber(stack.forkCount)}
                </Text>
              </View>
            </View>
          </View>

          {/* Creator + CTA */}
          <View style={styles.creatorRow}>
            <TouchableOpacity
              onPress={() => navigateToProfile(stack.creator.id)}
              style={styles.creatorInfo}
              activeOpacity={0.7}
            >
              <Avatar uri={stack.creator.avatar} size={26} />
              <View>
                <Text variant="caption" color={colors.text.secondary}>
                  by
                </Text>
                <Text
                  variant="bodySmall"
                  color={colors.text.primary}
                  style={{ fontFamily: 'SpaceMono', fontSize: 12 }}
                >
                  @{stack.creator.username}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToStack} style={styles.viewButton} activeOpacity={0.8}>
              <Text variant="button" color={colors.text.inverse}>
                VIEW STACK
              </Text>
              <ArrowRight size={14} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  topArea: {
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemCountBadgeImage: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  spacer: {
    flex: 1,
  },
  titleArea: {
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {},

  // The stacked cards
  stackContainer: {
    marginBottom: spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    height: ITEM_CARD_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  rankCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.text.primary,
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    gap: 1,
  },
  itemLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 13,
    lineHeight: 18,
  },
  stakeBar: {
    width: 44,
    height: 4,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
  },
  stakeBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  moreHint: {
    marginTop: -ITEM_OVERLAP + 2,
    paddingVertical: 6,
  },

  // Bottom area
  bottomArea: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: borderWidth.thin,
    borderTopColor: colors.borderLight,
  },
  bottomAreaImage: {
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  bottomTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.brand.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: borderWidth.thick,
    borderColor: colors.brand.accent,
  },
});
