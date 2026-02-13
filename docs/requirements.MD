# Context
App Context: Intuition Flagship Mobile App (Stacks + Trust) initial Mock (Just mocked data and interactions for now)

We are designing the flagship consumer mobile app for Intuition, a protocol for expressing and coordinating contextual trust over information.

The core primitive is that trust is local, relational, and contested, not global or absolute.

Users interact with:

Atoms = entities or concepts (people, topics, claims)

Triples = relationships between atoms (e.g. “Alex is good at Web3”)

Stacks = curated/ranked collections of atoms/triples (viral-first “lists of things”)

Ignition / Staking = committing signal behind a belief or ranking

The app must feel like a knowledge-social product, not a DeFi dashboard.

Key Product Principles

High-signal, low-noise discovery

Trust is always scoped to a context

Avoid explicit financial language (no “price”, “yield”, “ROI”)

Use indirect value terms: Heat, Momentum, Heartbeat, Participants

Social actions matter: following, forking, backing

Clear boundary between:

Feed = passive discovery

Notifications = explicit user-directed events

Profile = stable identity + trust footprint

Core Screens Being Designed

Feed

Personalized stack discovery

Social context (“X backed this stack”)

Lightweight engagement signals (“Heat”, “Momentum”)

Profile

Identity + followers/following

Reputation/ranking signal

Stacks created + items ignited/staked

Reality Tunnel

Compare your worldview vs another user

Show alignment/divergence across stacks and rankings

Encourage exploration/forking

Contextual Trust → Stake Flow

Express trust/distrust in someone within a context

Example: “Trust Alex in Web3, distrust Alex at soccer”

Ends with staking/ignition

Notifications / Inbox

Notifications: forks, stakes, follows, meaningful events

Inbox: direct user messages

Must not become noisy like a feed

Visual + Interaction Language

Brutalist + light cyberpunk aesthetic

Light theme, minimal UI chrome

TikTok-style navigation where relevant:

Vertical swipe between stacks

Horizontal swipe inside a stack

Goal

Build an Intuition-native viral consumer app where users create, rank, back, and compare meaningful knowledge structures — turning speculation into functional trust coordination.

# Screens

## 1- Login screen
Required: Login with google, apple, web3 wallet or create account. Intuition must be writen on the the page 


## 2- Feed
Required:
The Feed should surface relevant stacks in a high-signal, low-noise way.
Core requirements:
Stack Discovery Feed
Personalized feed of stacks that matter to the user (based on interests, activity, network, trending signals)
Lightweight Financial Signals (Non-Financial Language) The feed should expose value/engagement indirectly using terms like:
Heat
Heartbeat
Participants
Momentum
Activity Level
Avoid explicit “price”, “yield”, or overly DeFi-native framing.
Friends / Following Activity Social context should be visible, e.g.:
“X backed this stack”
“Y forked this ranking”
“3 friends are participating”
Feed vs Notifications Boundary We need a clear threshold between:
passive discovery (Feed)
explicit user-directed events (Notifications)
The Feed should not become a noisy alert stream.
Categories:
Top/Hot, trending and fresh / Community (sports, AI,..., they are dynamic)
Tag collections of stacks
Scope of Content Are we showing only stacks in the Feed, or do we also surface:
individual atoms
triples - Add to Stack, Stack created, Person followed Person, User Commented on Stack/Item, User staked on Comment of person
other graph-level activity?
Full-screen stack cards with vertical swipe to move to the next stack
Horizontal swipe to explore items inside a stack (TikTok-style navigation)
Immersive swipe view (one stack at a time)

## 3- Stack view
Required
The Stack view should provide a clear, high-signal experience with the following:
Stack Metrics
Overall activity, volume, participation, etc.
Participants
Who is engaging with or staking on the stack
Momentum Indicator (“Heat” / “Heartbeat”)
A lightweight signal of recent activity and velocity
Global Ranking
The stack’s position relative to others across the ecosystem
Positive / Negative Vault Breakdown
Clear separation between support and opposition
Agree vs Oppose Clarity
Users must immediately understand how to:
agree with an item
oppose an item
express directional conviction
Swipe Navigation
Swipe-based interaction to move through stack items smoothly
Double-Tap to Stake
Fast, low-friction staking gesture
Sound Feedback
Optional audio cues for interaction (stake, swipe, confirm)
Fork Stack
Users should be able to fork an existing stack into their own variant
Suggest Changes
Lightweight proposal mechanism for:
additions
removals
reordering
Editing Actions
Support structured contributions like:
adding new items
re-ranking
suggesting improvements

## 4- Create a stack
Required
Simple UI/UX
Drag items to the stack
Save as draft (off-chain)
Users can Fork stacks

## 5- Stake
Required:
We need to allow users to stake across multiple entity types:
stacks
atoms
triples
They need to be able to specify the amount they want to steak

## 6- Share screen
Required:
The Share flow should make it effortless for users to distribute stacks externally and drive viral discovery.
Core requirements:
Share Stack as a Viral Artifact
Users should be able to share a stack as a standalone object
The shared content must be understandable even outside the app
Auto-Generated Share Card / Preview
Render a clean, high-contrast visual card including:
Stack title
Top ranked items
Heat / Heartbeat indicator
Participant count
Creator attribution
Multiple Share Formats Support sharing as:
Image card (social-first)
Link (deep link into the app)
Embed-style preview (future)
Call-to-Action Built In Shared content should naturally invite interaction:
“Agree or oppose”
“Fork this stack”
“Add your stake”
Share Destination Options One-tap export to:
Messages / iMessage / WhatsApp
X / Twitter
Instagram Stories
Copy link
Deep Linking + Onboarding Bridge If the recipient doesn’t have the app:
Open a web preview
Prompt install
Land directly on the stack after signup
Privacy / Visibility Controls Users should be able to choose:
Public share
Followers-only share
Private / unlisted link
Attribution + Credibility Shared stacks should include:
Creator identity
Fork lineage (“forked from…”)
Optional credibility signals
Highlight Personal Position Optionally show:
“Luis backed #1”
“3 friends oppose #4”
User’s own stance in the shared snapshot
Remix-Friendly Sharing Encourage downstream creation:
“Fork and reorder”
“Make your own version”

## 7- Profile
Required: The Profile should represent a user’s identity, social graph, and trust footprint in a clean, high-signal way.
Core requirements:
Identity Surface
Profile picture
Name + handle
Optional short bio/tagline
Follow / Social Graph
Followers count
Following count
Mutual context (optional)
Follow / Unfollow button
Visible only on other users’ profiles
Never shown on your own profile
Ranking / Reputation Signal
Profile should surface lightweight credibility indicators, e.g.:
Global rank / percentile
Momentum / Activity Level
Trusted in X stacks Avoid vanity-only metrics.
Ignited / Staked Items
The Profile must show what the user is actively backing:
Stacks the user ignited
Items they are participating in Use non-financial language: Ignited, Backed, Signal, Heat Avoid DeFi-native framing (yield, ROI, etc).
User’s Stack Library
Created stacks
Forked rankings
Saved / watched stacks (optional)
Profile vs Notifications Boundary Profile is a stable identity + participation view, not an alert stream.


## 8- Reality Tunnel
Required: The Reality Tunnel should let users compare their worldview (trust + rankings) against another user’s, surfacing alignment and divergence in a high-signal way.
Core requirements:
Comparative View
The screen must show:
You vs Selected User
Shared context (mutual follows, common stacks)
Clear “comparison mode” framing
Alignment vs Divergence
Reality Tunnel should surface:
Where both users agree (overlapping rankings, shared belief)
Where they disagree (conflicting ordering, opposite signals)
Degree of distance (Close / Split / Opposed)
Stack-Level Differences
Primary unit of comparison is stacks:
Stacks you both participate in
Stacks only one of you ignited
Stacks ranked differently
Use lightweight language:
Alignment
Friction
Divergence
Signal overlap
Trust Footprint Contrast
Show protocol-native deltas such as:
Heat committed in the same region
Different atoms/triples emphasized
Different communities shaping each tunnel
Avoid framing as “right vs wrong” — it’s perspective comparison.
Interaction Model
Select a stack or topic region
Swipe/scroll through key differences
Tap into “why” (items driving divergence)
Discovery Hook
Reality Tunnel should encourage exploration:
“Follow their tunnel”
“Fork this ranking”
“Bridge this gap” (optional mechanic)
Feed vs Notifications Boundary Reality Tunnel is an inspectable comparison space, not an event 

## 9- Contextual Trust (Stake Entry)
Required: This screen should let a user express trust or distrust in someone within a specific context, and flow directly into staking.
Core requirements:
Contextual Trust Statement
Users must be able to create a scoped claim like:
“I trust Alex in Web3”
“I distrust Alex at soccer”
Trust is always:
Person + Context + Direction
Trust vs Distrust Choice
Clear binary action:
Trust
Distrust Not global reputation — strictly local and contextual.
Context Selector
User must choose or search the context atom:
Topic (Web3, Rust, Parenting, Soccer…)
Existing stack or category
Suggested contexts based on activity
Lightweight Signal Framing
Avoid heavy financial language. Use:
Signal
Confidence
Heat
Commitment Not “bet” or “trade.”
Social + Network Visibility (Optional)
Show soft context like:
“3 people you follow trust Alex here”
“This context is contested”
Stake Flow Integration
This screen must end with a clear next step:
Continue to Stake / Ignite Signal Staking is the commitment layer behind trust.
Preview of Resulting Triple
User should understand what they’re creating:
(You) → Trusts/Distrusts → (Alex) in (Context)
Feed vs Notifications Boundary This is an intentional action screen, never triggered as a notification.


## 10- Notifications / Inbox
Required: The Notifications screen should surface explicit user-directed events and messages, without becoming noisy or feed-like.
Core requirements:
Notifications vs Inbox Split
Two clear modes:
Notifications = protocol/social events
Inbox = direct user messages
Notifications (High-Signal Events)
Show only meaningful events tied to the user, e.g.:
“Alex forked the stack IA 2026”
“Nicole staked the triple Intuition is awesome”
“3 people backed your stack”
“Someone followed you” (optional)
Avoid low-value spam (every minor action).
Social Context
Notifications should clearly show:
Actor (who)
Action (what)
Object (stack/triple/atom)
Timestamp
Tap-through destination
Lightweight Language
Use protocol-native framing:
Forked
Backed
Ignited
Participated Avoid DeFi-native or financial alert tone.
Inbox (Direct Messages)
Inbox should support:
Message threads with users
Unread indicators
Simple, calm chat entry point
No mixing with protocol events
Noise Threshold + Filtering
Notifications must stay bounded:
Only events involving your follows, your stacks, or your positions
Optional filters: Forks / Stakes / Mentions / Social
Feed vs Notifications Boundary Notifications are explicit, user-relevant events. Feed remains passive discovery — never duplicated here.


# Relative guidelines
Screens must follow the same design principles. Everything is light themed. This is a mobile app so I need to be able to run it on my device, maybe (just maybe, you may have much better solutions) react native would be a good fit. 