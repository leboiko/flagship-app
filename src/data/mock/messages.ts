import { Message, InboxThread } from '../../types';
import { users } from './users';

export const messages: Message[] = [
  {
    id: 'msg-1',
    threadId: 'thread-1',
    sender: users[1],
    content: 'Hey! Love your L2 stack. Have you considered adding Arbitrum?',
    createdAt: '2025-01-22T15:00:00Z',
    read: false,
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    sender: users[0],
    content: 'Thanks Maya! Good call, I was thinking about it.',
    createdAt: '2025-01-22T15:05:00Z',
    read: true,
  },
  {
    id: 'msg-3',
    threadId: 'thread-1',
    sender: users[1],
    content:
      'Would be interesting to see how it compares to Base in terms of ecosystem growth.',
    createdAt: '2025-01-22T15:10:00Z',
    read: false,
  },
  {
    id: 'msg-4',
    threadId: 'thread-2',
    sender: users[4],
    content: 'Interested in collaborating on a trust infrastructure review?',
    createdAt: '2025-01-21T10:00:00Z',
    read: true,
  },
  {
    id: 'msg-5',
    threadId: 'thread-2',
    sender: users[0],
    content: 'Absolutely! Let me draft some initial thoughts.',
    createdAt: '2025-01-21T10:30:00Z',
    read: true,
  },
  {
    id: 'msg-6',
    threadId: 'thread-3',
    sender: users[3],
    content:
      'Your governance stack inspired me to create one focused on DAOs. Check it out!',
    createdAt: '2025-01-20T14:00:00Z',
    read: true,
  },
];

export const inboxThreads: InboxThread[] = [
  {
    id: 'thread-1',
    participants: [users[0], users[1]],
    lastMessage: messages[2],
    unreadCount: 2,
    updatedAt: '2025-01-22T15:10:00Z',
  },
  {
    id: 'thread-2',
    participants: [users[0], users[4]],
    lastMessage: messages[4],
    unreadCount: 0,
    updatedAt: '2025-01-21T10:30:00Z',
  },
  {
    id: 'thread-3',
    participants: [users[0], users[3]],
    lastMessage: messages[5],
    unreadCount: 0,
    updatedAt: '2025-01-20T14:00:00Z',
  },
];

export const getThreadById = (id: string): InboxThread | undefined =>
  inboxThreads.find(t => t.id === id);

export const getMessagesByThread = (threadId: string): Message[] =>
  messages.filter(m => m.threadId === threadId);
