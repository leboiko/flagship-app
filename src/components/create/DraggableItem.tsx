import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GripVertical, X } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { StackItem } from '../../types';

interface DraggableItemProps {
  item: StackItem;
  onRemove: () => void;
  drag?: () => void;
  isActive?: boolean;
}

export function DraggableItem({ item, onRemove, drag, isActive }: DraggableItemProps) {
  return (
    <View style={[styles.container, isActive && styles.active]}>
      <TouchableOpacity onPressIn={drag} style={styles.dragHandle}>
        <GripVertical size={18} color={colors.text.secondary} />
      </TouchableOpacity>
      <View style={styles.rank}>
        <Text variant="label" color={colors.text.inverse}>{item.rank}</Text>
      </View>
      <View style={styles.info}>
        <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }}>
          {item.atom.label}
        </Text>
        <Text variant="caption" color={colors.text.secondary}>
          {item.atom.type}
        </Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <X size={16} color={colors.actions.negative} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
    borderRadius: 8,
  },
  active: {
    borderColor: colors.brand.accent,
    backgroundColor: '#FFF5F0',
  },
  dragHandle: {
    padding: 4,
  },
  rank: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
});
