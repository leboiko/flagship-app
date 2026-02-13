import React from 'react';
import { TextInput, View, ViewStyle, TextInputProps } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderWidth, radius, typography } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

export function Input({ label, containerStyle, style, ...props }: InputProps) {
  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="label" style={{ marginBottom: spacing.xs }}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={colors.text.secondary}
        style={[
          {
            borderWidth: borderWidth.thick,
            borderColor: colors.border,
            borderRadius: radius.sm,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm + 2,
            fontFamily: 'Inter',
            fontSize: 16,
            color: colors.text.primary,
            backgroundColor: colors.surface,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}
