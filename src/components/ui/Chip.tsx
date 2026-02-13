import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderWidth, radius } from '../../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Chip({ label, active = false, onPress, style }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          height: 32,
          paddingHorizontal: spacing.md,
          borderRadius: radius.sm,
          borderWidth: borderWidth.thick,
          borderColor: colors.border,
          backgroundColor: active ? colors.text.primary : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text variant="label" color={active ? colors.text.inverse : colors.text.primary}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
