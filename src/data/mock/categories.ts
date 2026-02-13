import { Category } from '../../types';

// Topic categories for stack creation
export const categories: Category[] = [
  { id: 'defi', label: 'DeFi', icon: 'coins' },
  { id: 'blockchain', label: 'Blockchain', icon: 'blocks' },
  { id: 'ai', label: 'AI', icon: 'brain' },
  { id: 'governance', label: 'Governance', icon: 'landmark' },
  { id: 'infrastructure', label: 'Infra', icon: 'server' },
  { id: 'identity', label: 'Identity', icon: 'fingerprint' },
  { id: 'social', label: 'Social', icon: 'users' },
  { id: 'nft', label: 'NFT', icon: 'image' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'other', label: 'Other', icon: 'more-horizontal' },
];

// Feed-level filters (separate from topic categories)
export const feedFilters = [
  { id: 'top', label: 'Top', icon: 'flame' },
  { id: 'trending', label: 'Trending', icon: 'trending-up' },
  { id: 'fresh', label: 'Fresh', icon: 'sparkles' },
  { id: 'community', label: 'Community', icon: 'users' },
];
