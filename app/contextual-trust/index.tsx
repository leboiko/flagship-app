import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, Button } from '../../src/components/ui';
import { PersonSelector } from '../../src/components/contextual-trust/PersonSelector';
import { ContextSelector } from '../../src/components/contextual-trust/ContextSelector';
import { DirectionToggle } from '../../src/components/contextual-trust/DirectionToggle';
import { TriplePreview } from '../../src/components/contextual-trust/TriplePreview';
import { useStakeStore } from '../../src/stores';
import { useHaptics } from '../../src/hooks';
import { colors, spacing, borderWidth } from '../../src/theme';
import { User } from '../../src/types';

export default function ContextualTrustScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const haptics = useHaptics();
  const { setPendingStake } = useStakeStore();
  const [person, setPerson] = useState<User | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [direction, setDirection] = useState<'trust' | 'distrust' | null>(null);

  const isComplete = person && context && direction;

  const handleStake = () => {
    if (!isComplete) return;
    haptics.medium();
    setPendingStake({
      targetType: 'triple',
      targetId: `trust-${person.id}-${context}`,
      amount: 100,
      direction: direction === 'trust' ? 'for' : 'against',
    });
    router.push(`/stake/triple/trust-${person.id}-${context}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text variant="h3">Contextual Trust</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Live preview */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <TriplePreview person={person} context={context} direction={direction} />
        </Animated.View>

        {/* Step 1: Person */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <PersonSelector selected={person} onSelect={(u) => { setPerson(u); haptics.light(); }} />
        </Animated.View>

        {/* Step 2: Context */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <ContextSelector selected={context} onSelect={(c) => { setContext(c); haptics.light(); }} />
        </Animated.View>

        {/* Step 3: Direction */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <DirectionToggle direction={direction} onSelect={(d) => { setDirection(d); haptics.light(); }} />
        </Animated.View>

        {/* Stake button */}
        <Button
          title="PROCEED TO STAKE"
          onPress={handleStake}
          variant="primary"
          fullWidth
          disabled={!isComplete}
          style={{ marginTop: spacing.lg }}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.medium,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: borderWidth.thick,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
});
