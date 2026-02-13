import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { colors, borderWidth } from '../../theme';

interface AvatarProps {
  uri: string;
  size?: number;
  style?: ViewStyle;
  borderColor?: string;
}

export function Avatar({ uri, size = 40, style, borderColor = colors.border }: AvatarProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth.thick,
          borderColor,
          overflow: 'hidden',
          backgroundColor: colors.borderLight,
        },
        style,
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        transition={200}
      />
    </View>
  );
}
