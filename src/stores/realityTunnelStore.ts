import { create } from 'zustand';
import { User, AlignmentData, StackComparison, Divergence } from '../types';
import { getUserById, stacks } from '../data/mock';

interface RealityTunnelState {
  comparedUser: User | null;
  alignmentData: AlignmentData | null;
  isLoading: boolean;
  loadComparison: (userId: string) => Promise<void>;
}

const generateMockAlignment = (userId: string): AlignmentData => {
  const comparisons: StackComparison[] = stacks.slice(0, 4).map((stack, i) => ({
    stack,
    userARank: i + 1,
    userBRank: Math.floor(Math.random() * 4) + 1,
    alignment: Math.floor(Math.random() * 60) + 40,
  }));

  const divergences: Divergence[] = [
    {
      topic: 'L2 Scaling',
      description: 'Different priorities on Layer 2 solutions',
      userAPosition: 'Favors Base for ecosystem growth',
      userBPosition: 'Prefers Arbitrum for decentralization',
      severity: 'medium',
    },
    {
      topic: 'AI Governance',
      description: 'Opposing views on AI regulation',
      userAPosition: 'Pro open-source AI development',
      userBPosition: 'Favors regulated AI deployment',
      severity: 'high',
    },
    {
      topic: 'DeFi Risk',
      description: 'Risk tolerance in DeFi protocols',
      userAPosition: 'Conservative, blue-chip only',
      userBPosition: 'Aggressive, exploring new protocols',
      severity: 'low',
    },
  ];

  return {
    overallAlignment: Math.floor(Math.random() * 40) + 45,
    stackComparisons: comparisons,
    divergences,
  };
};

export const useRealityTunnelStore = create<RealityTunnelState>((set) => ({
  comparedUser: null,
  alignmentData: null,
  isLoading: false,
  loadComparison: async (userId) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = getUserById(userId);
    const data = generateMockAlignment(userId);
    set({ comparedUser: user || null, alignmentData: data, isLoading: false });
  },
}));
