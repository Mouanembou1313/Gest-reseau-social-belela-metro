export type NotificationIcon =
    | 'heart-3-fill'
    | 'chat-3-fill'
    | 'user-add-fill';
export type NotificationItem = {
    id: string;
    title: string;
    time: string;
    icon: NotificationIcon;
};

export const NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        title: 'Jean Dupont a aimé votre publication',
        time: 'Il y a 5 min',
        icon: 'heart-3-fill',
    },
    {
        id: '2',
        title: 'Alice Martin a commenté votre post',
        time: 'Il y a 30 min',
        icon: 'chat-3-fill',
    },
    {
        id: '3',
        title: 'Bob Dupuis vous a envoyé une demande',
        time: 'Hier',
        icon: 'user-add-fill',
    },
];
