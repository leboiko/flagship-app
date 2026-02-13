import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderWidth, radius } from '../../theme';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

export function Badge({ label, color = colors.brand.accent, textColor = colors.text.inverse, style, size = 'md' }: BadgeProps) {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          paddingHorizontal: size === 'sm' ? spacing.xs : spacing.sm,
          paddingVertical: size === 'sm' ? 2 : spacing.xs,
          borderRadius: radius.sm,
          borderWidth: borderWidth.medium,
          borderColor: colors.border,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text variant={size === 'sm' ? 'caption' : 'label'} color={textColor}>
        {label}
      </Text>
    </View>
  );
}
