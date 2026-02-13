import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderWidth, radius } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const bgColor = {
    primary: colors.brand.accent,
    secondary: colors.text.primary,
    outline: 'transparent',
    ghost: 'transparent',
    danger: colors.actions.negative,
  }[variant];

  const textColor = {
    primary: colors.text.inverse,
    secondary: colors.text.inverse,
    outline: colors.text.primary,
    ghost: colors.text.primary,
    danger: colors.text.inverse,
  }[variant];

  const paddingV = { sm: spacing.xs, md: spacing.sm + 2, lg: spacing.md }[size];
  const paddingH = { sm: spacing.md, md: spacing.lg, lg: spacing.xl }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: bgColor,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          borderWidth: variant === 'ghost' ? 0 : borderWidth.thick,
          borderColor: variant === 'outline' ? colors.border : variant === 'ghost' ? 'transparent' : bgColor,
          borderRadius: radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text variant="button" color={textColor}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
