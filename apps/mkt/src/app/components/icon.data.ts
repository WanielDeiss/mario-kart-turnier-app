export type IconName = 'play' | 'pause';

export interface IconData {
  path: string;
  fill: 'currentColor' | 'none';
  viewBox: `${number} ${number} ${number} ${number}`;
}

export const IconData: { [key in IconName]: IconData } = {
  play: {
    fill: 'currentColor',
    path: '<path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" />',
    viewBox: '0 0 24 24',
  },
  pause: {
    fill: 'currentColor',
    path: '<path fill-rule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clip-rule="evenodd" />',
    viewBox: '0 0 24 24',
  },
};
