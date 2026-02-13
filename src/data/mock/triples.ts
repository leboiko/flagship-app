import { Triple } from '../../types';
import { atoms } from './atoms';
import { users } from './users';

export const triples: Triple[] = [
  {
    id: 'triple-1',
    subject: atoms[3], // Vitalik Buterin
    predicate: atoms[12], // Trust
    object: atoms[0], // Ethereum
    totalStaked: 89000,
    forStaked: 78000,
    againstStaked: 11000,
    stakerCount: 567,
    createdBy: users[1],
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'triple-2',
    subject: atoms[5], // OpenAI
    predicate: atoms[13], // Coordination
    object: atoms[2], // Artificial Intelligence
    totalStaked: 67000,
    forStaked: 45000,
    againstStaked: 22000,
    stakerCount: 345,
    createdBy: users[4],
    createdAt: '2025-01-12T14:30:00Z',
  },
  {
    id: 'triple-3',
    subject: atoms[10], // Base
    predicate: atoms[4], // Decentralization
    object: atoms[15], // Layer 2
    totalStaked: 45000,
    forStaked: 38000,
    againstStaked: 7000,
    stakerCount: 234,
    createdBy: users[2],
    createdAt: '2025-01-15T09:15:00Z',
  },
  {
    id: 'triple-4',
    subject: atoms[1], // Bitcoin
    predicate: atoms[12], // Trust
    object: atoms[8], // DeFi
    totalStaked: 112000,
    forStaked: 34000,
    againstStaked: 78000,
    stakerCount: 789,
    createdBy: users[3],
    createdAt: '2025-01-08T16:00:00Z',
  },
  {
    id: 'triple-5',
    subject: atoms[6], // Zero Knowledge Proofs
    predicate: atoms[13], // Coordination
    object: atoms[4], // Decentralization
    totalStaked: 56000,
    forStaked: 51000,
    againstStaked: 5000,
    stakerCount: 345,
    createdBy: users[4],
    createdAt: '2025-01-20T11:45:00Z',
  },
  {
    id: 'triple-6',
    subject: atoms[11], // Intuition
    predicate: atoms[12], // Trust
    object: atoms[9], // Governance
    totalStaked: 78000,
    forStaked: 72000,
    againstStaked: 6000,
    stakerCount: 456,
    createdBy: users[0],
    createdAt: '2025-01-22T08:00:00Z',
  },
];

export const getTripleById = (id: string): Triple | undefined =>
  triples.find(t => t.id === id);
