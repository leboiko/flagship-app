import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from '../ui';
import { spacing } from '../../theme';
import { feedFilters } from '../../data/mock';
import { FeedFilter } from '../../types';

interface FeedCategoryTabsProps {
  active: FeedFilter | 'all';
  onSelect: (category: FeedFilter | 'all') => void;
}

export function FeedCategoryTabs({ active, onSelect }: FeedCategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip
        label="ALL"
        active={active === 'all'}
        onPress={() => onSelect('all')}
        style={{ marginRight: spacing.sm }}
      />
      {feedFilters.map((f, i) => (
        <Chip
          key={f.id}
          label={f.label.toUpperCase()}
          active={active === f.id}
          onPress={() => onSelect(f.id as FeedFilter)}
          style={i < feedFilters.length - 1 ? { marginRight: spacing.sm } : undefined}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
});
