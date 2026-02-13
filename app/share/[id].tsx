import React from 'react';
import { View, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Copy, MessageCircle, Twitter, Instagram, Link2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, Card, Badge } from '../../src/components/ui';
import { SignalBadges } from '../../src/components/feed/SignalBadges';
import { useStackStore } from '../../src/stores';
import { useHaptics } from '../../src/hooks';
import { colors, spacing, borderWidth, radius } from '../../src/theme';
import { formatNumber } from '../../src/utils';
import { getStackById } from '../../src/data/mock';

export default function ShareScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const stack = id ? getStackById(id) : null;

  const shareUrl = `https://intuition.systems/stack/${id}`;

  const handleCopyLink = () => {
    haptics.success();
    Alert.alert('Copied', 'Link copied to clipboard');
  };

  const handleNativeShare = async () => {
    try {
      await Share.share({
        message: `Check out "${stack?.title}" on Intuition\n${shareUrl}`,
      });
    } catch (e) {
      // Silent
    }
  };

  if (!stack) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="h3">Share Stack</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Share card preview */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <Card style={styles.shareCard} variant="elevated">
            <View style={styles.cardHeader}>
              <Text variant="label" color={colors.brand.accent}>INTUITION</Text>
              <Badge label={stack.category.toUpperCase()} size="sm" />
            </View>
            <Text variant="h2" numberOfLines={2}>{stack.title}</Text>
            <Text variant="caption" color={colors.text.secondary} numberOfLines={2}>
              {stack.description}
            </Text>
            {/* Top 3 items */}
            {stack.items.slice(0, 3).map((item, i) => (
              <View key={item.id} style={styles.previewItem}>
                <Text variant="label">{i + 1}.</Text>
                <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }}>
                  {item.atom.label}
                </Text>
              </View>
            ))}
            <View style={styles.cardFooter}>
              <SignalBadges
                heat={stack.signals.heat}
                heartbeat={stack.signals.heartbeat}
                momentum={stack.signals.momentum}
              />
              <Text variant="caption" color={colors.text.secondary}>
                {formatNumber(stack.stakerCount)} stakers
              </Text>
            </View>
          </Card>
        </Animated.View>

        {/* Share options */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text variant="label" color={colors.text.secondary} style={{ marginBottom: spacing.md }}>
            SHARE VIA
          </Text>
          <View style={styles.shareOptions}>
            <TouchableOpacity onPress={handleNativeShare} style={styles.shareOption}>
              <View style={[styles.shareIcon, { backgroundColor: '#25D366' }]}>
                <MessageCircle size={22} color={colors.text.inverse} />
              </View>
              <Text variant="caption">Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNativeShare} style={styles.shareOption}>
              <View style={[styles.shareIcon, { backgroundColor: colors.text.primary }]}>
                <Twitter size={22} color={colors.text.inverse} />
              </View>
              <Text variant="caption">X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNativeShare} style={styles.shareOption}>
              <View style={[styles.shareIcon, { backgroundColor: '#E4405F' }]}>
                <Instagram size={22} color={colors.text.inverse} />
              </View>
              <Text variant="caption">Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCopyLink} style={styles.shareOption}>
              <View style={[styles.shareIcon, { backgroundColor: colors.brand.secondary }]}>
                <Link2 size={22} color={colors.text.inverse} />
              </View>
              <Text variant="caption">Copy Link</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Privacy note */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <View style={styles.privacyNote}>
            <Text variant="caption" color={colors.text.secondary} style={{ textAlign: 'center' }}>
              Your stake positions and identity will be visible on the shared card.
            </Text>
          </View>
        </Animated.View>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.medium,
    borderBottomColor: colors.border,
  },
  closeButton: {
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
  shareCard: {
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareOption: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  shareIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
  },
  privacyNote: {
    padding: spacing.md,
    backgroundColor: colors.borderLight,
    borderRadius: radius.sm,
  },
});
