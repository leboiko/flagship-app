import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from '../ui';
import { colors, spacing } from '../../theme';

const CONTEXTS = [
  'Web3', 'AI', 'DeFi', 'Governance', 'Engineering',
  'Design', 'Research', 'Philosophy', 'DAOs', 'Safety',
];

interface ContextSelectorProps {
  selected: string | null;
  onSelect: (context: string) => void;
}

export function ContextSelector({ selected, onSelect }: ContextSelectorProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" color={colors.text.secondary}>SELECT CONTEXT</Text>
      <View style={styles.chips}>
        {CONTEXTS.map((ctx) => (
          <Chip
            key={ctx}
            label={ctx.toUpperCase()}
            active={selected === ctx}
            onPress={() => onSelect(ctx)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
