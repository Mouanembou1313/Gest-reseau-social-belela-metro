// Types pour les données
export type Story = {
  id: string;
  name: string;
  img: string;
  isMe?: boolean;
};

export type Suggestion = {
  id: number;
  name: string;
  avatar: string;
  mutual: number;
};

// Stories
export const storiesData: Story[] = [
  {
    id: "me",
    name: "Votre story",
    img: "https://i.pravatar.cc/150?img=50",
    isMe: true,
  },
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: String(i + 1),
    name: `Ami ${i + 1}`,
    img: `https://i.pravatar.cc/150?img=${i + 1}`,
  })),
];

// Suggestions
export const suggestionsData: Suggestion[] = [
  { id: 1, name: "Alice Martin", avatar: "https://i.pravatar.cc/100?img=21", mutual: 2 },
  { id: 2, name: "Bob Dupuis", avatar: "https://i.pravatar.cc/100?img=22", mutual: 3 },
  { id: 3, name: "Clara Morel", avatar: "https://i.pravatar.cc/100?img=23", mutual: 1 },
];
