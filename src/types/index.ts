// Core entity types for the Intuition app

export interface User {
  id: string;
  displayName: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  totalStaked: number;
  reputationScore: number;
  trustedContexts: string[]; // e.g. ["Web3", "AI", "Soccer"]
  joinedDate: string;
}

export interface Atom {
  id: string;
  label: string;
  description: string;
  image?: string;
  type: 'person' | 'concept' | 'project' | 'organization' | 'topic';
  totalStaked: number;
  stakerCount: number;
}

export interface Triple {
  id: string;
  subject: Atom;
  predicate: Atom;
  object: Atom;
  totalStaked: number;
  forStaked: number;
  againstStaked: number;
  stakerCount: number;
  createdBy: User;
  createdAt: string;
}

export interface StackItem {
  id: string;
  atom: Atom;
  rank: number;
  stakeAmount: number;
  stakerCount: number;
}

export interface Stack {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: StackCategory;
  items: StackItem[];
  creator: User;
  totalStaked: number;
  stakerCount: number;
  forkCount: number;
  signals: StackSignals;
  socialContext?: SocialContext;
  createdAt: string;
  updatedAt: string;
  isDraft?: boolean;
  forkedFrom?: string;
}

export type StackCategory = 'defi' | 'blockchain' | 'ai' | 'governance' | 'infrastructure' | 'identity' | 'social' | 'nft' | 'security' | 'other';

export type FeedFilter = 'top' | 'trending' | 'fresh' | 'community';

export interface AtomActivity {
  id: string;
  atom: Atom;
  image?: string;
  activityType: 'added_to_stacks' | 'stake_surge' | 'new_stakers' | 'trending_topic';
  headline: string;       // e.g. "Added to 13 stacks yesterday"
  description: string;    // Longer context
  metric: number;         // The primary number (13 stacks, 340%, etc.)
  metricLabel: string;    // "stacks", "growth", "new stakers"
  timeframe: string;      // "yesterday", "this week", "last 24h"
  relatedStacks: Stack[]; // Top stacks this atom appears in
  signals: StackSignals;
  createdAt: string;
}

export type FeedItem =
  | { type: 'stack'; data: Stack }
  | { type: 'atom_activity'; data: AtomActivity };

export interface StackSignals {
  heat: number;        // 0-100
  heartbeat: number;   // 0-100
  momentum: number;    // 0-100
}

export interface SocialContext {
  type: 'backed' | 'forked' | 'created';
  user: User;
  message: string;
}

export interface StakePosition {
  id: string;
  userId: string;
  targetType: 'atom' | 'triple' | 'stack';
  targetId: string;
  amount: number;
  direction: 'for' | 'against';
  createdAt: string;
}

export type NotificationType = 'fork' | 'stake' | 'follow' | 'mention' | 'message';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  actor: User;
  targetId?: string;
  targetType?: 'stack' | 'atom' | 'triple' | 'profile';
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  sender: User;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface InboxThread {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface AlignmentData {
  overallAlignment: number; // 0-100
  stackComparisons: StackComparison[];
  divergences: Divergence[];
}

export interface StackComparison {
  stack: Stack;
  userARank?: number;
  userBRank?: number;
  alignment: number;
}

export interface Divergence {
  topic: string;
  description: string;
  userAPosition: string;
  userBPosition: string;
  severity: 'low' | 'medium' | 'high';
}
