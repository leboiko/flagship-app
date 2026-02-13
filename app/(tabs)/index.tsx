import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, RefreshControl, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui';
import { StackCard } from '../../src/components/feed/StackCard';
import { AtomActivityCard } from '../../src/components/feed/AtomActivityCard';
import { FeedCategoryTabs } from '../../src/components/feed/FeedCategoryTabs';
import { useFeedStore } from '../../src/stores';
import { colors, spacing, borderWidth } from '../../src/theme';
import { FeedItem } from '../../src/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 85;
const CARD_HEIGHT = SCREEN_HEIGHT - TAB_BAR_HEIGHT;

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { feedItems, activeCategory, setCategory, setCurrentIndex, refreshFeed, isLoading } = useFeedStore();
  const [headerHeight, setHeaderHeight] = useState(140);

  const onHeaderLayout = useCallback((e: LayoutChangeEvent) => {
    setHeaderHeight(e.nativeEvent.layout.height);
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
    [setCurrentIndex]
  );

  const renderItem = useCallback(
    ({ item }: { item: FeedItem }) => {
      if (item.type === 'atom_activity') {
        return <AtomActivityCard activity={item.data} topInset={headerHeight} />;
      }
      return <StackCard stack={item.data} topInset={headerHeight} />;
    },
    [headerHeight]
  );

  const keyExtractor = useCallback((item: FeedItem) => {
    if (item.type === 'atom_activity') return `aa-${item.data.id}`;
    return item.data.id;
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: insets.top + spacing.xs }]}
        onLayout={onHeaderLayout}
      >
        <Text variant="h3" style={styles.headerTitle}>
          INTUITION
        </Text>
        <FeedCategoryTabs active={activeCategory} onSelect={setCategory} />
      </View>

      {/* Feed */}
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        snapToInterval={CARD_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshFeed}
            tintColor={colors.brand.accent}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.background,
    borderBottomWidth: borderWidth.medium,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    letterSpacing: 4,
  },
});
