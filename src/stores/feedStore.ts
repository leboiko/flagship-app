import { create } from 'zustand';
import { Stack, FeedFilter, FeedItem } from '../types';
import { stacks as allStacks, atomActivities } from '../data/mock';

function filterStacks(filter: FeedFilter | 'all'): Stack[] {
  switch (filter) {
    case 'top':
      return [...allStacks].sort((a, b) => b.totalStaked - a.totalStaked);
    case 'trending':
      return [...allStacks]
        .filter(s => s.signals.heat >= 70)
        .sort((a, b) => b.signals.heat - a.signals.heat);
    case 'fresh':
      return [...allStacks]
        .filter(s => s.signals.momentum >= 70)
        .sort((a, b) => b.signals.momentum - a.signals.momentum);
    case 'community':
      return [...allStacks]
        .filter(s => s.signals.heartbeat >= 70)
        .sort((a, b) => b.signals.heartbeat - a.signals.heartbeat);
    case 'all':
    default:
      return allStacks;
  }
}

function buildFeedItems(filter: FeedFilter | 'all'): FeedItem[] {
  const stacks = filterStacks(filter);
  const stackItems: FeedItem[] = stacks.map(s => ({ type: 'stack', data: s }));

  // Only mix in atom activities for 'all' and 'trending' filters
  if (filter !== 'all' && filter !== 'trending') return stackItems;

  const activityItems: FeedItem[] = atomActivities.map(a => ({ type: 'atom_activity', data: a }));

  // Interleave: insert an atom activity card every 3-4 stack cards
  const mixed: FeedItem[] = [];
  let actIdx = 0;
  for (let i = 0; i < stackItems.length; i++) {
    mixed.push(stackItems[i]);
    // After every 3rd stack card, insert an activity if available
    if ((i + 1) % 3 === 0 && actIdx < activityItems.length) {
      mixed.push(activityItems[actIdx]);
      actIdx++;
    }
  }
  // Append remaining activities at the end
  while (actIdx < activityItems.length) {
    mixed.push(activityItems[actIdx]);
    actIdx++;
  }

  return mixed;
}

interface FeedState {
  feedItems: FeedItem[];
  activeCategory: FeedFilter | 'all';
  currentIndex: number;
  isLoading: boolean;
  setCategory: (category: FeedFilter | 'all') => void;
  setCurrentIndex: (index: number) => void;
  refreshFeed: () => Promise<void>;
  likeStack: (stackId: string) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  feedItems: buildFeedItems('all'),
  activeCategory: 'all',
  currentIndex: 0,
  isLoading: false,
  setCategory: (category) => {
    set({ activeCategory: category, feedItems: buildFeedItems(category), currentIndex: 0 });
  },
  setCurrentIndex: (index) => set({ currentIndex: index }),
  refreshFeed: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 800));
    const { activeCategory } = get();
    set({ feedItems: buildFeedItems(activeCategory), isLoading: false });
  },
  likeStack: (stackId) => {
    set(state => ({
      feedItems: state.feedItems.map(item => {
        if (item.type === 'stack' && item.data.id === stackId) {
          return {
            ...item,
            data: {
              ...item.data,
              signals: { ...item.data.signals, heartbeat: Math.min(100, item.data.signals.heartbeat + 5) },
            },
          };
        }
        return item;
      }),
    }));
  },
}));
