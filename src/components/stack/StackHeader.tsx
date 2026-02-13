import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { Text } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { Stack } from '../../types';

interface StackHeaderProps {
  stack: Stack;
  hasImage?: boolean;
}

export function StackHeader({ stack, hasImage = false }: StackHeaderProps) {
  const router = useRouter();

  // Light theme — keep dark text, use frosted white backgrounds over images
  const btnBg = hasImage ? 'rgba(255,255,255,0.7)' : colors.background;
  const btnBorder = hasImage ? 'rgba(0,0,0,0.12)' : colors.border;
  const containerBg = hasImage ? 'transparent' : colors.background;
  const borderBottom = hasImage ? 'transparent' : colors.border;

  return (
    <View style={[styles.container, { backgroundColor: containerBg, borderBottomColor: borderBottom }]}>
      <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: btnBg, borderColor: btnBorder }]}>
        <ArrowLeft size={20} color={colors.text.primary} />
      </TouchableOpacity>
      <View style={styles.titleArea}>
        <Text variant="label" color={colors.text.secondary}>
          STACK
        </Text>
        <Text variant="h3" numberOfLines={1} color={colors.text.primary}>
          {stack.title}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => router.push(`/share/${stack.id}`)}
          style={[styles.iconButton, { backgroundColor: btnBg, borderColor: btnBorder }]}
        >
          <Share2 size={18} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.medium,
    gap: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
