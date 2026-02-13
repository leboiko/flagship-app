import { TextStyle } from 'react-native';

export const fonts = {
  mono: 'SpaceMono',
  sans: 'Inter',
  sansBold: 'Inter_700Bold',
  sansLight: 'Inter_300Light',
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontFamily: 'SpaceMono', fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  h2: { fontFamily: 'SpaceMono', fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  h3: { fontFamily: 'SpaceMono', fontSize: 18, lineHeight: 24 },
  body: { fontFamily: 'Inter', fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: 'Inter', fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: 'Inter', fontSize: 12, lineHeight: 16 },
  label: { fontFamily: 'SpaceMono', fontSize: 11, lineHeight: 14, letterSpacing: 1.5, textTransform: 'uppercase' },
  metric: { fontFamily: 'SpaceMono', fontSize: 20, lineHeight: 24 },
  metricLarge: { fontFamily: 'SpaceMono', fontSize: 32, lineHeight: 38 },
  button: { fontFamily: 'SpaceMono', fontSize: 14, lineHeight: 18, letterSpacing: 0.5, textTransform: 'uppercase' },
};

export type Typography = typeof typography;
