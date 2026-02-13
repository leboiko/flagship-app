import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, Chip } from '../../src/components/ui';
import { NotificationItem } from '../../src/components/notifications/NotificationItem';
import { NotificationFilters } from '../../src/components/notifications/NotificationFilters';
import { InboxThreadItem } from '../../src/components/notifications/InboxThread';
import { useNotificationStore, useAuthStore } from '../../src/stores';
import { colors, spacing, borderWidth } from '../../src/theme';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const {
    notifications,
    threads,
    activeFilter,
    activeTab,
    setFilter,
    setTab,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const handleNotificationPress = (notification: any) => {
    markAsRead(notification.id);
    if (notification.targetType === 'stack' && notification.targetId) {
      router.push(`/stack/${notification.targetId}`);
    } else if (notification.targetType === 'profile' && notification.targetId) {
      router.push(`/profile/${notification.targetId}`);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="h3" style={{ letterSpacing: 2 }}>INBOX</Text>
        {activeTab === 'notifications' && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text variant="caption" color={colors.brand.accent}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tab toggle */}
      <View style={styles.tabToggle}>
        <Chip
          label="NOTIFICATIONS"
          active={activeTab === 'notifications'}
          onPress={() => setTab('notifications')}
          style={{ marginRight: spacing.sm }}
        />
        <Chip
          label="MESSAGES"
          active={activeTab === 'inbox'}
          onPress={() => setTab('inbox')}
        />
      </View>

      {activeTab === 'notifications' ? (
        <>
          <NotificationFilters active={activeFilter} onSelect={setFilter} />
          <FlatList
            data={filteredNotifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NotificationItem
                notification={item}
                onPress={() => handleNotificationPress(item)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text variant="bodySmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                  No notifications
                </Text>
              </View>
            }
          />
        </>
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InboxThreadItem
              thread={item}
              currentUserId={user?.id || ''}
              onPress={() => {
                // Navigate to thread detail (simplified for prototype)
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text variant="bodySmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                No messages
              </Text>
            </View>
          }
        />
      )}
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
  tabToggle: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  empty: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
});
