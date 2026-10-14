export type Story = {
  id: string;
  userId?: string;
  createdAt?: string;
  name: string;
  img: string;
  avatar: string;
  isMe?: boolean;
  type?: "image" | "video" | "text";
  text?: string;
  caption?: string;
  backgroundColor?: string;
};

export type StoryGroup = Story & {
  items: Story[];
};

export type Suggestion = {
  id: number;
  name: string;
  avatar: string;
  mutual: number;
};

export const suggestionsData: Suggestion[] = [
  { id: 1, name: "Alice Martin", avatar: "https://i.pravatar.cc/100?img=21", mutual: 2 },
  { id: 2, name: "Bob Dupuis", avatar: "https://i.pravatar.cc/100?img=22", mutual: 3 },
  { id: 3, name: "Clara Morel", avatar: "https://i.pravatar.cc/100?img=23", mutual: 1 },
];
