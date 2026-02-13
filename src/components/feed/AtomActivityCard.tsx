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
import { TrendingUp, Users, Layers, ArrowRight, Zap } from 'lucide-react-native';
import { Text, Badge } from '../ui';
import { SignalBadges } from './SignalBadges';
import { colors, spacing, borderWidth, radius } from '../../theme';
import { AtomActivity, Stack } from '../../types';
import { formatNumber } from '../../utils/formatters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 85;
const CARD_HEIGHT = SCREEN_HEIGHT - TAB_BAR_HEIGHT;

const ACTIVITY_ICONS = {
  added_to_stacks: Layers,
  stake_surge: TrendingUp,
  new_stakers: Users,
  trending_topic: Zap,
};

const ACTIVITY_COLORS = {
  added_to_stacks: colors.brand.accent,
  stake_surge: '#FF006E',
  new_stakers: colors.brand.secondary,
  trending_topic: colors.brand.accent,
};

interface AtomActivityCardProps {
  activity: AtomActivity;
  topInset?: number;
}

function RelatedStackRow({ stack, index }: { stack: Stack; index: number }) {
  const router = useRouter();

  return (
    <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(350).springify().damping(18)}>
      <TouchableOpacity
        onPress={() => router.push(`/stack/${stack.id}`)}
        style={styles.relatedStack}
        activeOpacity={0.7}
      >
        <View style={styles.relatedStackRank}>
          <Text variant="label" color={colors.text.inverse} style={{ fontSize: 10 }}>
            {index + 1}
          </Text>
        </View>
        <View style={styles.relatedStackInfo}>
          <Text variant="body" numberOfLines={1} color={colors.text.primary} style={{ fontFamily: 'SpaceMono', fontSize: 13 }}>
            {stack.title}
          </Text>
          <Text variant="caption" color={colors.text.secondary}>
            {formatNumber(stack.totalStaked)} staked · {formatNumber(stack.stakerCount)} stakers
          </Text>
        </View>
        <ArrowRight size={14} color={colors.text.secondary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export function AtomActivityCard({ activity, topInset = 140 }: AtomActivityCardProps) {
  const router = useRouter();
  const hasImage = !!activity.image;
  const ActivityIcon = ACTIVITY_ICONS[activity.activityType];
  const activityColor = ACTIVITY_COLORS[activity.activityType];

  const navigateToAtom = () => {
    router.push(`/atom/${activity.atom.id}`);
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      {hasImage && (
        <Image
          source={{ uri: activity.image }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={300}
        />
      )}

      {/* Light gradient overlay */}
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
        {/* Top area: type badge */}
        <View style={styles.topArea}>
          <View style={styles.topRow}>
            <Badge
              label="ATOM ACTIVITY"
              color={hasImage ? 'rgba(255,255,255,0.75)' : colors.text.primary}
              textColor={hasImage ? colors.text.primary : colors.text.inverse}
              size="sm"
              style={hasImage ? { borderColor: 'rgba(0,0,0,0.15)' } : undefined}
            />
            <View style={[styles.typeBadge, { backgroundColor: activityColor }]}>
              <ActivityIcon size={12} color={colors.text.inverse} />
              <Text variant="caption" color={colors.text.inverse} style={{ fontFamily: 'SpaceMono', fontSize: 10 }}>
                {activity.activityType.replace(/_/g, ' ').toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Atom name + big metric */}
        <View style={styles.heroArea}>
          <Text variant="label" color={colors.text.secondary} style={{ letterSpacing: 2 }}>
            {activity.atom.type.toUpperCase()}
          </Text>
          <Text
            variant="h1"
            numberOfLines={2}
            color={colors.text.primary}
            style={styles.atomName}
          >
            {activity.atom.label}
          </Text>

          {/* Big metric pill */}
          <View style={[styles.metricPill, { borderColor: activityColor }]}>
            <ActivityIcon size={18} color={activityColor} />
            <Text variant="h2" color={activityColor} style={{ fontFamily: 'SpaceMono' }}>
              {activity.activityType === 'stake_surge' ? `+${activity.metric}%` : activity.metric}
            </Text>
            <Text variant="caption" color={colors.text.secondary} style={{ fontFamily: 'SpaceMono' }}>
              {activity.metricLabel}
            </Text>
          </View>

          <Text
            variant="bodySmall"
            color={colors.text.secondary}
            numberOfLines={2}
            style={styles.description}
          >
            {activity.description}
          </Text>
        </View>

        {/* Related stacks */}
        <View style={styles.relatedSection}>
          <Text variant="label" color={colors.text.secondary} style={{ letterSpacing: 1, marginBottom: spacing.xs }}>
            APPEARS IN
          </Text>
          {activity.relatedStacks.slice(0, 3).map((stack, index) => (
            <RelatedStackRow key={stack.id} stack={stack} index={index} />
          ))}
        </View>

        {/* Bottom area: signals + CTA */}
        <View style={[styles.bottomArea, hasImage && styles.bottomAreaImage]}>
          <View style={styles.bottomTopRow}>
            <SignalBadges
              heat={activity.signals.heat}
              heartbeat={activity.signals.heartbeat}
              momentum={activity.signals.momentum}
            />
            <View style={styles.atomStats}>
              <Text variant="caption" color={colors.text.secondary} style={{ fontFamily: 'SpaceMono' }}>
                {formatNumber(activity.atom.totalStaked)} total staked
              </Text>
            </View>
          </View>

          <View style={styles.ctaRow}>
            <Text variant="caption" color={colors.text.secondary}>
              {activity.timeframe}
            </Text>
            <TouchableOpacity onPress={navigateToAtom} style={styles.viewButton} activeOpacity={0.8}>
              <Text variant="button" color={colors.text.inverse}>
                EXPLORE ATOM
              </Text>
              <ArrowRight size={14} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
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
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  spacer: {
    flex: 1,
  },
  heroArea: {
    marginBottom: spacing.md,
  },
  atomName: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: borderWidth.thick,
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  description: {
    lineHeight: 20,
  },
  relatedSection: {
    marginBottom: spacing.md,
  },
  relatedStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  relatedStackRank: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedStackInfo: {
    flex: 1,
    gap: 1,
  },
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
  atomStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
