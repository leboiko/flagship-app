export const colors = {
  background: '#F5F5F0',
  surface: '#FFFFFF',
  text: {
    primary: '#0A0A0A',
    secondary: '#5A5A58',
    inverse: '#FFFFFF',
  },
  brand: {
    accent: '#FF3B00',    // orange-red
    secondary: '#00E5FF', // cyan
  },
  signals: {
    heat: '#FF3B00',
    heartbeat: '#FF006E',
    momentum: '#0097A7',
  },
  actions: {
    positive: '#00C853',
    negative: '#FF1744',
  },
  border: '#0A0A0A',
  borderLight: '#E0E0DC',
  overlay: 'rgba(10, 10, 10, 0.6)',
  transparent: 'transparent',
};

export type Colors = typeof colors;
