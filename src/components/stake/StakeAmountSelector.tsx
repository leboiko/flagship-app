import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Slider } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { formatNumber } from '../../utils/formatters';

const PRESETS = [100, 500, 1000, 5000, 10000];

interface StakeAmountSelectorProps {
  amount: number;
  onAmountChange: (amount: number) => void;
}

export function StakeAmountSelector({ amount, onAmountChange }: StakeAmountSelectorProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" color={colors.text.secondary}>STAKE AMOUNT</Text>
      <Text variant="metricLarge" style={styles.amount}>
        {formatNumber(amount)}
      </Text>

      <Slider
        value={amount}
        min={10}
        max={50000}
        onValueChange={onAmountChange}
        style={{ marginVertical: spacing.md }}
      />

      <View style={styles.presets}>
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset}
            onPress={() => onAmountChange(preset)}
            style={[
              styles.presetButton,
              amount === preset && styles.presetActive,
            ]}
          >
            <Text
              variant="caption"
              color={amount === preset ? colors.text.inverse : colors.text.primary}
              style={{ fontFamily: 'SpaceMono' }}
            >
              {formatNumber(preset)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  amount: {
    textAlign: 'center',
  },
  presets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  presetButton: {
    flex: 1,
    paddingVertical: spacing.xs + 2,
    borderRadius: 4,
    borderWidth: borderWidth.medium,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  presetActive: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
});
