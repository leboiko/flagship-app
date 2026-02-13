# Intuition

A functional clickable prototype of the Intuition mobile app — a knowledge-social product for expressing and coordinating contextual trust. All data is mocked.

> Truth is not a number. Trust is not global. Meaning is local and contested.

## Tech Stack

- **Expo SDK 54** (managed workflow) + **expo-router v6** (file-based routing)
- **React Native 0.81** with New Architecture enabled
- **react-native-reanimated v4** + **react-native-gesture-handler** (animations/gestures)
- **Zustand v5** (state management)
- **expo-haptics** / **expo-av** (haptic and sound feedback)
- **react-native-draggable-flatlist** (drag-and-drop for stack creation)
- **lucide-react-native** (icons)
- **expo-image** (optimized image loading)
- **expo-linear-gradient** (gradient overlays)
- **TypeScript 5.9**

## Getting Started

### Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on your iOS or Android device, or an emulator/simulator

### Install

```bash
npm install
```

### Run

```bash
npx expo start           # Start dev server (scan QR with Expo Go)
npx expo start --android  # Run on Android device/emulator
npx expo start --ios      # Run on iOS simulator
```

### Verify

```bash
npx tsc --noEmit   # TypeScript check
npx expo lint      # Lint check
```

## Project Structure

```
app/                              # expo-router file-based routes
  _layout.tsx                     # Root layout (GestureHandlerRootView, fonts, auth gate)
  (auth)/
    _layout.tsx                   # Auth stack layout
    login.tsx                     # Login screen
  (tabs)/
    _layout.tsx                   # Tab navigator (Feed, Create, Notifications, Profile)
    index.tsx                     # Feed (TikTok-style vertical swipe)
    create.tsx                    # Create a Stack
    notifications.tsx             # Notifications / Inbox
    profile.tsx                   # Own Profile
  atom/[id].tsx                   # Atom Detail view
  stack/[id].tsx                  # Stack Detail view
  stake/[entityType]/[id].tsx     # Stake screen (hold-to-confirm)
  share/[id].tsx                  # Share card screen
  profile/[userId].tsx            # Other user Profile
  reality-tunnel/[userId].tsx     # Reality Tunnel comparison
  contextual-trust/
    index.tsx                     # Contextual Trust flow
    stake.tsx                     # Trust staking

src/
  components/
    ui/                           # Design system primitives
                                  #   Text, Button, Card, Badge, Avatar, Input,
                                  #   Slider, BottomSheet, Chip
    feed/                         # StackCard, AtomActivityCard, FeedCategoryTabs,
                                  #   SocialContext, SignalBadges
    stack/                        # StackHeader, StackMetrics, VaultBreakdown,
                                  #   StackItemList
    create/                       # DraggableItem, CreateStackForm, AtomSearch, DraftBanner
    stake/                        # StakeAmountSelector, StakeConfirmation, EntityPreview
    share/                        # ShareCard, ShareOptions, PrivacySelector
    profile/                      # ProfileHeader, StatsRow, StackLibrary, FollowButton
    reality-tunnel/               # ComparisonHeader, AlignmentMeter, StackComparison,
                                  #   DivergenceCard
    contextual-trust/             # PersonSelector, ContextSelector, DirectionToggle,
                                  #   TriplePreview
    notifications/                # NotificationItem, NotificationFilters, InboxThread

  data/mock/                      # Mock data: users, atoms, stacks, triples,
                                  #   notifications, messages, atomActivities, categories
  stores/                         # Zustand stores: auth, feed, stack, stake,
                                  #   profile, notification, realityTunnel
  types/                          # TypeScript interfaces for all entities
  theme/                          # colors, typography, spacing
  hooks/                          # useSwipeNavigation, useDoubleTap, useHaptics, useSound
  utils/                          # formatters, sharing helpers
```

## Design System

**Aesthetic**: Brutalist + light cyberpunk, polished animations.

- **Background**: `#F5F5F0` (warm off-white) | **Surface**: `#FFFFFF`
- **Text**: `#0A0A0A` (primary), `#5A5A58` (secondary)
- **Brand**: `#FF3B00` (orange-red accent), `#00E5FF` (cyan secondary)
- **Signals**: Heat `#FF3B00`, Heartbeat `#FF006E`, Momentum `#0097A7`
- **Actions**: Positive `#00C853`, Negative `#FF1744`
- **Borders**: Thick black `#0A0A0A` (brutalist), no shadows
- **Fonts**: Inter (body) + SpaceMono (monospace labels/metrics)

**Principles**: Border-first (no shadows), thick black borders, content-first, minimal chrome, light theme with frosted glass overlays on background images.

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `/(auth)/login` | Centered branding + wallet/social login buttons |
| Feed | `/(tabs)/` | TikTok-style vertical swipe with Stack cards and Atom Activity cards |
| Stack View | `/stack/[id]` | Full stack detail with background image, metrics, vault breakdown, ranked items |
| Atom Detail | `/atom/[id]` | Atom info, monetary metrics, list of stacks containing it, agree/oppose |
| Create Stack | `/(tabs)/create` | Title, description, category, drag-and-drop item ranking |
| Stake | `/stake/[entityType]/[id]` | Amount selector, for/against toggle, hold-to-confirm |
| Profile | `/(tabs)/profile` | Stats, reputation signals, stack library |
| Reality Tunnel | `/reality-tunnel/[userId]` | Side-by-side comparison of your views vs another user |
| Contextual Trust | `/contextual-trust` | Select person + context, trust/distrust, build triples |
| Share | `/share/[id]` | Auto-generated share card with options |
| Notifications | `/(tabs)/notifications` | Filterable notifications + inbox messages |

## Key Interactions

- **Vertical swipe feed**: `FlatList` with `pagingEnabled` + `snapToInterval`
- **Mixed feed types**: Stack cards and Atom Activity cards interleaved
- **Double-tap to stake**: Tap gesture -> scale-up animation + haptic feedback
- **Hold-to-confirm staking**: Long press with circular progress ring
- **Drag-and-drop**: Reorder items when creating stacks
- **Signal pulse**: Heartbeat icon with repeating scale animation
- **Screen transitions**: Slide from right for push, bottom for modals

## Feed Content Types

The feed displays two types of cards:

1. **Stack Cards** — Full-screen cards showing a curated ranking (title, description, ranked items, signals, creator)
2. **Atom Activity Cards** — Highlight trending atoms with activity like "Added to 13 stacks yesterday" or "Stake grew 340% this week", linking to related stacks

Atom activity cards appear interleaved every 3 stack cards on the "All" and "Trending" filters.
