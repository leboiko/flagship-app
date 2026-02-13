import { AtomActivity } from '../../types';
import { atoms } from './atoms';
import { stacks } from './stacks';

export const atomActivities: AtomActivity[] = [
  {
    id: 'aa-1',
    atom: atoms[0], // Ethereum
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&h=1800&fit=crop&q=90',
    activityType: 'added_to_stacks',
    headline: 'Added to 13 stacks yesterday',
    description: 'Ethereum is seeing a surge in curation activity as builders rank it across infrastructure and DeFi stacks.',
    metric: 13,
    metricLabel: 'stacks',
    timeframe: 'yesterday',
    relatedStacks: [stacks[0], stacks[2], stacks[4]],
    signals: { heat: 91, heartbeat: 78, momentum: 85 },
    createdAt: '2025-01-22T08:00:00Z',
  },
  {
    id: 'aa-2',
    atom: atoms[2], // Artificial Intelligence
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=1800&fit=crop&q=90',
    activityType: 'stake_surge',
    headline: 'Stake grew 340% this week',
    description: 'Massive conviction shift as stakers pile into AI-related rankings following breakthrough announcements.',
    metric: 340,
    metricLabel: '% growth',
    timeframe: 'this week',
    relatedStacks: [stacks[1], stacks[3]],
    signals: { heat: 96, heartbeat: 82, momentum: 94 },
    createdAt: '2025-01-21T14:30:00Z',
  },
  {
    id: 'aa-3',
    atom: atoms[6], // Zero Knowledge Proofs
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=1800&fit=crop&q=90',
    activityType: 'new_stakers',
    headline: '487 new stakers in 24 hours',
    description: 'ZK tech is capturing attention as new privacy and scaling solutions launch across multiple chains.',
    metric: 487,
    metricLabel: 'new stakers',
    timeframe: 'last 24h',
    relatedStacks: [stacks[0], stacks[2]],
    signals: { heat: 88, heartbeat: 71, momentum: 92 },
    createdAt: '2025-01-22T06:15:00Z',
  },
  {
    id: 'aa-4',
    atom: atoms[8], // DeFi
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=1800&fit=crop&q=90',
    activityType: 'trending_topic',
    headline: 'Trending across 8 categories',
    description: 'DeFi is dominating discourse — appearing in governance, infrastructure, and security stacks alike.',
    metric: 8,
    metricLabel: 'categories',
    timeframe: 'this week',
    relatedStacks: [stacks[3], stacks[5], stacks[7]],
    signals: { heat: 94, heartbeat: 89, momentum: 87 },
    createdAt: '2025-01-21T10:00:00Z',
  },
  {
    id: 'aa-5',
    atom: atoms[11], // Intuition
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=1800&fit=crop&q=90',
    activityType: 'added_to_stacks',
    headline: 'Added to 9 stacks today',
    description: 'The knowledge graph protocol is gaining momentum as trust infrastructure becomes a hot topic.',
    metric: 9,
    metricLabel: 'stacks',
    timeframe: 'today',
    relatedStacks: [stacks[2], stacks[4]],
    signals: { heat: 85, heartbeat: 92, momentum: 88 },
    createdAt: '2025-01-22T11:30:00Z',
  },
];

export const getAtomActivityById = (id: string): AtomActivity | undefined =>
  atomActivities.find(a => a.id === id);
