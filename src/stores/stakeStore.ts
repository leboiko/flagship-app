import { create } from 'zustand';
import { StakePosition } from '../types';

interface StakeState {
  positions: StakePosition[];
  pendingStake: {
    targetType: 'atom' | 'triple' | 'stack';
    targetId: string;
    amount: number;
    direction: 'for' | 'against';
  } | null;
  isConfirming: boolean;
  isSuccess: boolean;
  setPendingStake: (stake: StakeState['pendingStake']) => void;
  setAmount: (amount: number) => void;
  setDirection: (direction: 'for' | 'against') => void;
  confirmStake: () => Promise<void>;
  resetStake: () => void;
}

export const useStakeStore = create<StakeState>((set, get) => ({
  positions: [],
  pendingStake: null,
  isConfirming: false,
  isSuccess: false,
  setPendingStake: (stake) => set({ pendingStake: stake, isSuccess: false }),
  setAmount: (amount) => {
    const { pendingStake } = get();
    if (pendingStake) {
      set({ pendingStake: { ...pendingStake, amount } });
    }
  },
  setDirection: (direction) => {
    const { pendingStake } = get();
    if (pendingStake) {
      set({ pendingStake: { ...pendingStake, direction } });
    }
  },
  confirmStake: async () => {
    set({ isConfirming: true });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const { pendingStake, positions } = get();
    if (pendingStake) {
      const newPosition: StakePosition = {
        id: `pos-${Date.now()}`,
        userId: 'user-1',
        ...pendingStake,
        createdAt: new Date().toISOString(),
      };
      set({
        positions: [...positions, newPosition],
        isConfirming: false,
        isSuccess: true,
        pendingStake: null,
      });
    }
  },
  resetStake: () => set({ pendingStake: null, isConfirming: false, isSuccess: false }),
}));
