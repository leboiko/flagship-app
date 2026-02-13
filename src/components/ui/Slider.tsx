import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { colors, borderWidth, spacing } from '../../theme';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onValueChange: (value: number) => void;
  trackColor?: string;
  fillColor?: string;
  style?: ViewStyle;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  onValueChange,
  trackColor = colors.borderLight,
  fillColor = colors.brand.accent,
  style,
}: SliderProps) {
  const sliderWidth = useSharedValue(0);
  const position = useSharedValue(((value - min) / (max - min)));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const newPos = Math.max(0, Math.min(1, e.x / sliderWidth.value));
      position.value = newPos;
      const newValue = Math.round(min + newPos * (max - min));
      runOnJS(onValueChange)(newValue);
    });

  const fillStyle = useAnimatedStyle(() => ({
    width: `${position.value * 100}%`,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    left: `${position.value * 100}%`,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View
        style={[{ height: 40, justifyContent: 'center' }, style]}
        onLayout={(e) => { sliderWidth.value = e.nativeEvent.layout.width; }}
      >
        <View style={{ height: 6, backgroundColor: trackColor, borderRadius: 3, borderWidth: borderWidth.medium, borderColor: colors.border }}>
          <Animated.View style={[{ height: '100%', backgroundColor: fillColor, borderRadius: 2 }, fillStyle]} />
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: fillColor,
              borderWidth: borderWidth.thick,
              borderColor: colors.border,
              marginLeft: -12,
              top: 8,
            },
            thumbStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}
