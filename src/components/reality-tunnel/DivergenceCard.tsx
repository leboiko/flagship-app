import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react-native';
import { Text, Card } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { Divergence } from '../../types';

interface DivergenceCardProps {
  divergence: Divergence;
}

export function DivergenceCard({ divergence }: DivergenceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const severityColor = {
    low: colors.brand.secondary,
    medium: colors.brand.accent,
    high: colors.actions.negative,
  }[divergence.severity];

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.8}>
      <Card style={{ ...styles.container, borderLeftColor: severityColor, borderLeftWidth: 4 }}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <AlertTriangle size={14} color={severityColor} />
            <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono', flex: 1 }}>
              {divergence.topic}
            </Text>
          </View>
          {expanded ? (
            <ChevronUp size={16} color={colors.text.secondary} />
          ) : (
            <ChevronDown size={16} color={colors.text.secondary} />
          )}
        </View>
        {expanded && (
          <View style={styles.details}>
            <Text variant="caption" color={colors.text.secondary} style={styles.description}>
              {divergence.description}
            </Text>
            <View style={styles.positions}>
              <View style={[styles.position, { borderColor: colors.brand.accent }]}>
                <Text variant="label" color={colors.brand.accent}>YOU</Text>
                <Text variant="caption">{divergence.userAPosition}</Text>
              </View>
              <View style={[styles.position, { borderColor: colors.brand.secondary }]}>
                <Text variant="label" color={colors.brand.secondary}>THEM</Text>
                <Text variant="caption">{divergence.userBPosition}</Text>
              </View>
            </View>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  details: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  description: {
    lineHeight: 18,
  },
  positions: {
    gap: spacing.sm,
  },
  position: {
    padding: spacing.sm,
    borderWidth: borderWidth.medium,
    borderRadius: 6,
    gap: 4,
  },
});
