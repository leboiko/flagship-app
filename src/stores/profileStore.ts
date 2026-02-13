import { create } from 'zustand';
import { User, Stack } from '../types';
import { getUserById, getStacksByCreator } from '../data/mock';

interface ProfileState {
  viewingUser: User | null;
  userStacks: Stack[];
  isFollowing: boolean;
  loadProfile: (userId: string) => void;
  toggleFollow: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  viewingUser: null,
  userStacks: [],
  isFollowing: false,
  loadProfile: (userId) => {
    const user = getUserById(userId);
    const stacks = getStacksByCreator(userId);
    set({ viewingUser: user || null, userStacks: stacks, isFollowing: false });
  },
  toggleFollow: () => set(state => ({ isFollowing: !state.isFollowing })),
}));
