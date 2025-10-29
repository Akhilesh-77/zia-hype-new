export interface Bot {
  id: string;
  photoUrl: string;
  gifUrl: string;
  chatBgUrl: string;
  name: string;
  description: string;
  storyIdea: string;
}

export type ActiveTab = 'home' | 'create';

export type Theme = 'light' | 'dark' | 'pink';