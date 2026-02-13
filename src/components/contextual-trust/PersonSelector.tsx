import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Input } from '../ui';
import { colors, spacing, borderWidth } from '../../theme';
import { User } from '../../types';
import { users } from '../../data/mock';

interface PersonSelectorProps {
  selected: User | null;
  onSelect: (user: User) => void;
}

export function PersonSelector({ selected, onSelect }: PersonSelectorProps) {
  const [query, setQuery] = React.useState('');
  const filtered = users.filter(u =>
    u.displayName.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text variant="label" color={colors.text.secondary}>SELECT PERSON</Text>
      <Input placeholder="Search people..." value={query} onChangeText={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.row, selected?.id === item.id && styles.selected]}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Avatar uri={item.avatar} size={36} />
            <View style={styles.info}>
              <Text variant="bodySmall" style={{ fontFamily: 'SpaceMono' }}>
                {item.displayName}
              </Text>
              <Text variant="caption" color={colors.text.secondary}>
                @{item.username}
              </Text>
            </View>
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
    maxHeight: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    borderRadius: 6,
  },
  selected: {
    backgroundColor: '#FFF5F0',
    borderWidth: borderWidth.medium,
    borderColor: colors.brand.accent,
  },
  info: {
    flex: 1,
  },
});
