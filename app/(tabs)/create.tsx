import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Text, Button, Input, Chip, Card } from '../../src/components/ui';
import { AtomSearch } from '../../src/components/create/AtomSearch';
import { DraggableItem } from '../../src/components/create/DraggableItem';
import { useStackStore } from '../../src/stores';
import { useHaptics } from '../../src/hooks';
import { colors, spacing, borderWidth } from '../../src/theme';
import { StackItem, Atom, StackCategory } from '../../src/types';
import { categories } from '../../src/data/mock';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { draftStack, draftItems, updateDraft, addDraftItem, removeDraftItem, reorderDraftItems, saveDraft, publishStack, startDraft } = useStackStore();
  const [title, setTitle] = useState(draftStack?.title || '');
  const [description, setDescription] = useState(draftStack?.description || '');
  const [category, setCategory] = useState<StackCategory>(
    (draftStack?.category as StackCategory) || 'defi'
  );
  const [showSearch, setShowSearch] = useState(false);

  // Auto-start draft if not already creating
  React.useEffect(() => {
    if (!draftStack) {
      startDraft();
    }
  }, []);

  const handleAddAtom = (atom: Atom) => {
    haptics.light();
    addDraftItem(atom);
    setShowSearch(false);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a stack title.');
      return;
    }
    if (draftItems.length < 2) {
      Alert.alert('Required', 'Add at least 2 items to your stack.');
      return;
    }
    updateDraft({ title, description, category });
    haptics.success();
    await publishStack();
    router.push('/(tabs)');
  };

  const handleSaveDraft = () => {
    updateDraft({ title, description, category });
    saveDraft();
    haptics.light();
    Alert.alert('Saved', 'Draft saved successfully.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text variant="h2">Create Stack</Text>
        {draftStack?.forkedFrom && (
          <Text variant="caption" color={colors.brand.accent}>FORKED</Text>
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Input
          label="TITLE"
          placeholder="Name your stack..."
          value={title}
          onChangeText={setTitle}
        />

        {/* Description */}
        <Input
          label="DESCRIPTION"
          placeholder="What is this stack about?"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        {/* Category */}
        <View>
          <Text variant="label" color={colors.text.secondary} style={{ marginBottom: spacing.xs }}>
            CATEGORY
          </Text>
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label.toUpperCase()}
                active={category === cat.id}
                onPress={() => setCategory(cat.id as StackCategory)}
              />
            ))}
          </View>
        </View>

        {/* Items */}
        <View>
          <View style={styles.itemsHeader}>
            <Text variant="label" color={colors.text.secondary}>
              ITEMS ({draftItems.length})
            </Text>
            <Button
              title="+ ADD"
              onPress={() => setShowSearch(!showSearch)}
              variant="ghost"
              size="sm"
            />
          </View>

          {showSearch && (
            <Card style={{ marginBottom: spacing.md }}>
              <AtomSearch
                onSelect={handleAddAtom}
                excludeIds={draftItems.map(i => i.atom.id)}
              />
            </Card>
          )}

          {draftItems.length > 0 ? (
            <DraggableFlatList
              data={draftItems}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              onDragBegin={() => haptics.medium()}
              onDragEnd={({ data }) => reorderDraftItems(data)}
              renderItem={({ item, drag, isActive }: RenderItemParams<StackItem>) => (
                <DraggableItem
                  item={item}
                  onRemove={() => removeDraftItem(item.id)}
                  drag={drag}
                  isActive={isActive}
                />
              )}
              containerStyle={styles.itemsList}
            />
          ) : (
            <Card style={styles.emptyState}>
              <Text variant="bodySmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                Add items to build your stack.{'\n'}Drag to reorder.
              </Text>
            </Card>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button title="PUBLISH STACK" onPress={handlePublish} variant="primary" fullWidth />
          <Button title="SAVE DRAFT" onPress={handleSaveDraft} variant="outline" fullWidth />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.medium,
    borderBottomColor: colors.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  itemsList: {
    gap: spacing.sm,
  },
  emptyState: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
