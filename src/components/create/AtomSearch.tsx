import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import { Text, Input, Badge } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { Atom } from '../../types';
import { searchAtoms, atoms } from '../../data/mock';
import { formatNumber } from '../../utils/formatters';

interface AtomSearchProps {
  onSelect: (atom: Atom) => void;
  excludeIds?: string[];
}

export function AtomSearch({ onSelect, excludeIds = [] }: AtomSearchProps) {
  const [query, setQuery] = useState('');
  const results = query.length > 0
    ? searchAtoms(query).filter(a => !excludeIds.includes(a.id))
    : atoms.filter(a => !excludeIds.includes(a.id)).slice(0, 6);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search atoms..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultRow}
            onPress={() => {
              onSelect(item);
              setQuery('');
            }}
            activeOpacity={0.7}
          >
            <View style={styles.atomInfo}>
              <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }}>
                {item.label}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>
                {item.type} · {formatNumber(item.totalStaked)} staked
              </Text>
            </View>
            <Badge label={item.type.toUpperCase()} size="sm" color={colors.borderLight} textColor={colors.text.primary} />
            <Plus size={18} color={colors.brand.accent} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  list: {
    maxHeight: 250,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  atomInfo: {
    flex: 1,
  },
});
