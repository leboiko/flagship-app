import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, Avatar, Card } from '../../src/components/ui';
import { AlignmentMeter } from '../../src/components/reality-tunnel/AlignmentMeter';
import { DivergenceCard } from '../../src/components/reality-tunnel/DivergenceCard';
import { useRealityTunnelStore, useAuthStore } from '../../src/stores';
import { colors, spacing, borderWidth } from '../../src/theme';
import { formatNumber } from '../../src/utils';

export default function RealityTunnelScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);
  const { comparedUser, alignmentData, isLoading, loadComparison } = useRealityTunnelStore();

  useEffect(() => {
    if (userId) loadComparison(userId);
  }, [userId]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text variant="h3">Reality Tunnel</Text>
        <View style={{ width: 36 }} />
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <Text variant="bodySmall" color={colors.text.secondary}>Analyzing alignment...</Text>
        </View>
      ) : comparedUser && alignmentData ? (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Dual avatar comparison header */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.comparisonHeader}>
            <View style={styles.userColumn}>
              <Avatar uri={currentUser?.avatar || ''} size={56} borderColor={colors.brand.accent} />
              <Text variant="caption" style={{ fontFamily: 'SpaceMono' }}>YOU</Text>
            </View>
            <Text variant="h2" color={colors.text.secondary}>vs</Text>
            <View style={styles.userColumn}>
              <Avatar uri={comparedUser.avatar} size={56} borderColor={colors.brand.secondary} />
              <Text variant="caption" style={{ fontFamily: 'SpaceMono' }}>
                @{comparedUser.username}
              </Text>
            </View>
          </Animated.View>

          {/* Alignment meter */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <AlignmentMeter value={alignmentData.overallAlignment} />
          </Animated.View>

          {/* Stack comparisons */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)}>
            <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
              STACK COMPARISONS
            </Text>
            {alignmentData.stackComparisons.map((comp) => (
              <TouchableOpacity
                key={comp.stack.id}
                onPress={() => router.push(`/stack/${comp.stack.id}`)}
                activeOpacity={0.7}
              >
                <Card style={styles.compCard}>
                  <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }} numberOfLines={1}>
                    {comp.stack.title}
                  </Text>
                  <View style={styles.compRow}>
                    <View style={styles.rankCompare}>
                      <Text variant="caption" color={colors.brand.accent}>
                        Your rank: #{comp.userARank || '—'}
                      </Text>
                      <Text variant="caption" color={colors.brand.secondary}>
                        Their rank: #{comp.userBRank || '—'}
                      </Text>
                    </View>
                    <Text variant="metric" color={comp.alignment >= 70 ? colors.actions.positive : colors.text.secondary}>
                      {comp.alignment}%
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Divergences */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)}>
            <Text variant="label" color={colors.text.secondary} style={styles.sectionTitle}>
              KEY DIVERGENCES
            </Text>
            <View style={styles.divergenceList}>
              {alignmentData.divergences.map((div, i) => (
                <DivergenceCard key={i} divergence={div} />
              ))}
            </View>
          </Animated.View>

          <View style={{ height: 40 }} />
        </ScrollView>
      ) : null}
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  userColumn: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  compCard: {
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankCompare: {
    gap: 2,
  },
  divergenceList: {
    gap: spacing.sm,
  },
});
