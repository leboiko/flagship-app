import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { Text, Card } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { User } from '../../types';

interface TriplePreviewProps {
  person: User | null;
  context: string | null;
  direction: 'trust' | 'distrust' | null;
}

export function TriplePreview({ person, context, direction }: TriplePreviewProps) {
  const dirColor = direction === 'trust' ? colors.actions.positive : direction === 'distrust' ? colors.actions.negative : colors.text.secondary;

  return (
    <Card style={styles.container}>
      <Text variant="label" color={colors.text.secondary} style={styles.label}>
        TRUST TRIPLE PREVIEW
      </Text>
      <View style={styles.tripleRow}>
        <View style={[styles.node, person && styles.nodeActive]}>
          <Text variant="caption" color={person ? colors.text.primary : colors.text.secondary}>
            {person ? person.displayName : 'Person'}
          </Text>
        </View>
        <ArrowRight size={16} color={dirColor} />
        <View style={[styles.node, direction && { borderColor: dirColor }]}>
          <Text variant="caption" color={direction ? dirColor : colors.text.secondary}>
            {direction ? direction.toUpperCase() : 'Direction'}
          </Text>
        </View>
        <ArrowRight size={16} color={colors.text.secondary} />
        <View style={[styles.node, context && styles.nodeActive]}>
          <Text variant="caption" color={context ? colors.text.primary : colors.text.secondary}>
            {context || 'Context'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
  },
  tripleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  node: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: borderWidth.medium,
    borderColor: colors.borderLight,
    borderRadius: 4,
    borderStyle: 'dashed',
  },
  nodeActive: {
    borderColor: colors.border,
    borderStyle: 'solid',
    backgroundColor: colors.surface,
  },
});
