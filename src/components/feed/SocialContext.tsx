import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar } from '../ui';
import { colors, spacing } from '../../theme';
import { SocialContext as SocialContextType } from '../../types';

interface SocialContextProps {
  context: SocialContextType;
  onPressUser?: () => void;
  hasImage?: boolean;
}

export function SocialContext({ context, onPressUser, hasImage = false }: SocialContextProps) {
  return (
    <TouchableOpacity
      onPress={onPressUser}
      style={[styles.container, hasImage && styles.containerImage]}
      activeOpacity={0.7}
    >
      <Avatar uri={context.user.avatar} size={20} borderColor={hasImage ? 'rgba(0,0,0,0.1)' : colors.borderLight} />
      <Text
        variant="caption"
        color={hasImage ? colors.text.primary : colors.text.secondary}
        numberOfLines={1}
      >
        {context.message}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
  },
  containerImage: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
});
