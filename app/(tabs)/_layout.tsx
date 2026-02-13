import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Flame, PlusSquare, Bell, User } from 'lucide-react-native';
import { colors, spacing, borderWidth } from '../../src/theme';
import { Text } from '../../src/components/ui';
import { useNotificationStore } from '../../src/stores';

function TabIcon({ icon: Icon, color, focused }: { icon: any; color: string; focused: boolean }) {
  return (
    <View style={styles.tabIconContainer}>
      <Icon size={22} color={color} strokeWidth={focused ? 2.5 : 1.5} />
    </View>
  );
}

export default function TabLayout() {
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.brand.accent,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'FEED',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Flame} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'CREATE',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={PlusSquare} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'INBOX',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <TabIcon icon={Bell} color={color} focused={focused} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text variant="caption" color={colors.text.inverse} style={{ fontSize: 9 }}>
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={User} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: borderWidth.thick,
    borderTopColor: colors.border,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: spacing.xs,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.brand.accent,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.surface,
    paddingHorizontal: 3,
  },
});
