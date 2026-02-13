import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from '../ui';
import { spacing } from '../../theme';
import { NotificationType } from '../../types';

const FILTERS: { id: NotificationType | 'all'; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'stake', label: 'STAKES' },
  { id: 'fork', label: 'FORKS' },
  { id: 'follow', label: 'FOLLOWS' },
  { id: 'mention', label: 'MENTIONS' },
];

interface NotificationFiltersProps {
  active: NotificationType | 'all';
  onSelect: (filter: NotificationType | 'all') => void;
}

export function NotificationFilters({ active, onSelect }: NotificationFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {FILTERS.map((f) => (
        <Chip
          key={f.id}
          label={f.label}
          active={active === f.id}
          onPress={() => onSelect(f.id)}
          style={{ marginRight: spacing.sm }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
});
