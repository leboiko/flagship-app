import * as Sharing from 'expo-sharing';

export async function shareStack(stackId: string, title: string): Promise<void> {
  const url = `https://intuition.systems/stack/${stackId}`;
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(url, {
        dialogTitle: `Share "${title}"`,
      });
    }
  } catch (e) {
    // Silent fail for prototype
  }
}

export function generateShareUrl(type: string, id: string): string {
  return `https://intuition.systems/${type}/${id}`;
}
