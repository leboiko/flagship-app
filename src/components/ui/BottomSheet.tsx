import React, { ReactNode } from 'react';
import { View, Modal, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, borderWidth, radius } from '../../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number;
}

export function BottomSheet({ visible, onClose, children, height = SCREEN_HEIGHT * 0.5 }: BottomSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: colors.overlay }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height,
          backgroundColor: colors.surface,
          borderTopWidth: borderWidth.thick,
          borderTopColor: colors.border,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          padding: spacing.lg,
          paddingTop: spacing.md,
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: colors.borderLight,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: spacing.md,
          }}
        />
        {children}
      </View>
    </Modal>
  );
}
