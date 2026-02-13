import { create } from 'zustand';
import { Notification, NotificationType, InboxThread } from '../types';
import { notifications as mockNotifications, inboxThreads as mockThreads } from '../data/mock';

interface NotificationState {
  notifications: Notification[];
  threads: InboxThread[];
  activeFilter: NotificationType | 'all';
  activeTab: 'notifications' | 'inbox';
  unreadCount: number;
  setFilter: (filter: NotificationType | 'all') => void;
  setTab: (tab: 'notifications' | 'inbox') => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  threads: mockThreads,
  activeFilter: 'all',
  activeTab: 'notifications',
  unreadCount: mockNotifications.filter(n => !n.read).length,
  setFilter: (filter) => set({ activeFilter: filter }),
  setTab: (tab) => set({ activeTab: tab }),
  markAsRead: (id) =>
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.notifications.filter(n => !n.read && n.id !== id).length,
    })),
  markAllAsRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));
