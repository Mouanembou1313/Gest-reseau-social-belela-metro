// src/screens/home/home.types.ts
export type Story = {
    id: string;
    name: string;
    img: string;
    isMe?: boolean; // optionnel
};

export type Suggestion = {
    id: number;
    name: string;
    avatar: string;
    mutual: number;
};
