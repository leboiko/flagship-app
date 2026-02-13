import { create } from 'zustand';
import { Stack, StackItem, Atom } from '../types';
import { getStackById } from '../data/mock';

interface StackState {
  currentStack: Stack | null;
  draftStack: Partial<Stack> | null;
  draftItems: StackItem[];
  isCreating: boolean;
  loadStack: (id: string) => void;
  startDraft: () => void;
  updateDraft: (updates: Partial<Stack>) => void;
  addDraftItem: (atom: Atom) => void;
  removeDraftItem: (itemId: string) => void;
  reorderDraftItems: (items: StackItem[]) => void;
  saveDraft: () => void;
  publishStack: () => Promise<void>;
  forkStack: (stack: Stack) => void;
}

export const useStackStore = create<StackState>((set, get) => ({
  currentStack: null,
  draftStack: null,
  draftItems: [],
  isCreating: false,
  loadStack: (id) => {
    const stack = getStackById(id);
    set({ currentStack: stack || null });
  },
  startDraft: () => {
    set({
      draftStack: { title: '', description: '', category: 'defi' },
      draftItems: [],
      isCreating: true,
    });
  },
  updateDraft: (updates) => {
    set(state => ({
      draftStack: state.draftStack ? { ...state.draftStack, ...updates } : updates,
    }));
  },
  addDraftItem: (atom) => {
    const { draftItems } = get();
    const newItem: StackItem = {
      id: `draft-${Date.now()}`,
      atom,
      rank: draftItems.length + 1,
      stakeAmount: 0,
      stakerCount: 0,
    };
    set({ draftItems: [...draftItems, newItem] });
  },
  removeDraftItem: (itemId) => {
    set(state => ({
      draftItems: state.draftItems
        .filter(i => i.id !== itemId)
        .map((item, index) => ({ ...item, rank: index + 1 })),
    }));
  },
  reorderDraftItems: (items) => {
    set({ draftItems: items.map((item, index) => ({ ...item, rank: index + 1 })) });
  },
  saveDraft: () => {
    // In a real app, this would persist to storage
    set(state => ({
      draftStack: state.draftStack ? { ...state.draftStack, isDraft: true } : null,
    }));
  },
  publishStack: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ draftStack: null, draftItems: [], isCreating: false });
  },
  forkStack: (stack) => {
    set({
      draftStack: {
        title: `${stack.title} (Fork)`,
        description: stack.description,
        category: stack.category,
        forkedFrom: stack.id,
      },
      draftItems: [...stack.items],
      isCreating: true,
    });
  },
}));
