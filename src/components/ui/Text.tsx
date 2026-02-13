import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '../../theme';
import { colors } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: keyof typeof typography;
  color?: string;
}

export function Text({ variant = 'body', color, style, ...props }: TextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        { color: color || colors.text.primary },
        style,
      ]}
      {...props}
    />
  );
}
