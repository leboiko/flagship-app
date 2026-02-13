import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, spacing, borderWidth, radius } from '../../theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof spacing;
}

export function Card({ children, style, variant = 'default', padding = 'md' }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: borderWidth.thick,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing[padding],
        },
        variant === 'elevated' && {
          // Brutalist offset shadow
          shadowColor: colors.border,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
