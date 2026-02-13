import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { StackItem } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface StackItemListProps {
  items: StackItem[];
  hasImage?: boolean;
}

export function StackItemList({ items, hasImage = false }: StackItemListProps) {
  const router = useRouter();

  const textPrimary = colors.text.primary;
  const textSecondary = colors.text.secondary;
  const borderColor = hasImage ? 'rgba(0,0,0,0.06)' : colors.borderLight;
  const barTrackBg = hasImage ? 'rgba(0,0,0,0.06)' : colors.borderLight;

  return (
    <View style={styles.container}>
      <Text variant="label" color={textSecondary} style={styles.title}>
        RANKED ITEMS
      </Text>
      {items.map((item, index) => {
        const maxStake = items[0]?.stakeAmount || 1;
        const barWidth = (item.stakeAmount / maxStake) * 100;
        const isFirst = index === 0;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.itemRow, { borderBottomColor: borderColor }]}
            activeOpacity={0.7}
            onPress={() => router.push(`/atom/${item.atom.id}`)}
          >
            <View style={[
              styles.rank,
              {
                backgroundColor: colors.text.primary,
                borderColor: colors.text.primary,
              },
              isFirst && {
                backgroundColor: colors.brand.accent,
                borderColor: colors.brand.accent,
              },
            ]}>
              <Text
                variant="label"
                color={colors.text.inverse}
              >
                {item.rank}
              </Text>
            </View>
            <View style={styles.itemInfo}>
              <Text variant="body" color={textPrimary} style={{ fontFamily: 'SpaceMono', fontSize: 14 }}>
                {item.atom.label}
              </Text>
              <View style={styles.itemMeta}>
                <Text variant="caption" color={textSecondary}>
                  {formatNumber(item.stakeAmount)} staked · {formatNumber(item.stakerCount)} stakers
                </Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: barTrackBg }]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${barWidth}%`,
                      backgroundColor: isFirst ? colors.brand.accent : colors.brand.secondary,
                    },
                  ]}
                />
              </View>
            </View>
            <ChevronRight size={16} color={textSecondary} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    marginBottom: spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: borderWidth.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  barTrack: {
    height: 3,
    borderRadius: 2,
    marginTop: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
