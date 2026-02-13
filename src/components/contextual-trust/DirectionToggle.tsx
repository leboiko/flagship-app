import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing, borderWidth, radius } from '../../theme';

interface DirectionToggleProps {
  direction: 'trust' | 'distrust' | null;
  onSelect: (direction: 'trust' | 'distrust') => void;
}

export function DirectionToggle({ direction, onSelect }: DirectionToggleProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" color={colors.text.secondary}>DIRECTION</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onSelect('trust')}
          style={[styles.button, direction === 'trust' && styles.trustActive]}
        >
          <ThumbsUp size={20} color={direction === 'trust' ? colors.text.inverse : colors.actions.positive} />
          <Text
            variant="button"
            color={direction === 'trust' ? colors.text.inverse : colors.actions.positive}
          >
            TRUST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect('distrust')}
          style={[styles.button, direction === 'distrust' && styles.distrustActive]}
        >
          <ThumbsDown size={20} color={direction === 'distrust' ? colors.text.inverse : colors.actions.negative} />
          <Text
            variant="button"
            color={direction === 'distrust' ? colors.text.inverse : colors.actions.negative}
          >
            DISTRUST
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  trustActive: {
    backgroundColor: colors.actions.positive,
    borderColor: colors.actions.positive,
  },
  distrustActive: {
    backgroundColor: colors.actions.negative,
    borderColor: colors.actions.negative,
  },
});
