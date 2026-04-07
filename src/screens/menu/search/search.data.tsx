export type Friend = {
    id: string;
    name: string;
    username: string;
    avatar: string;
};

export const FRIENDS: Friend[] = [
    {
        id: "1",
        name: "Alice Martin",
        username: "@alice",
        avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "2",
        name: "Jean Dupont",
        username: "@jean",
        avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "3",
        name: "Bob Marley",
        username: "@bob",
        avatar: "https://i.pravatar.cc/150?img=8",
    },
];