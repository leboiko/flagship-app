import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Text, Chip, Card } from '../ui';
import { SignalBadges } from '../feed/SignalBadges';
import { colors, spacing, borderWidth } from '../../theme';
import { Stack } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface StackLibraryProps {
  stacks: Stack[];
}

type Tab = 'created' | 'forked' | 'saved';

export function StackLibrary({ stacks }: StackLibraryProps) {
  const [activeTab, setActiveTab] = useState<Tab>('created');
  const router = useRouter();

  const filteredStacks = stacks; // In a real app, filter by tab

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {(['created', 'forked', 'saved'] as Tab[]).map((tab) => (
          <Chip
            key={tab}
            label={tab.toUpperCase()}
            active={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </View>

      {filteredStacks.length > 0 ? (
        filteredStacks.map((stack) => (
          <TouchableOpacity
            key={stack.id}
            style={styles.stackRow}
            onPress={() => router.push(`/stack/${stack.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.stackInfo}>
              <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }} numberOfLines={1}>
                {stack.title}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>
                {formatNumber(stack.totalStaked)} staked · {formatNumber(stack.stakerCount)} stakers
              </Text>
              <SignalBadges
                heat={stack.signals.heat}
                heartbeat={stack.signals.heartbeat}
                momentum={stack.signals.momentum}
              />
            </View>
            <ArrowRight size={16} color={colors.text.secondary} />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.empty}>
          <Text variant="bodySmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
            No stacks yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: spacing.sm,
  },
  stackInfo: {
    flex: 1,
    gap: 4,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
});
