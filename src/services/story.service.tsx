import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.0.2.2:5000/api/v1/belela';

export type ApiStory = {
  _id: string;
  customId?: string;
  userId?: {
    _id: string;
    username?: string;
    profilePic?: string;
  };
  type: 'image' | 'video' | 'text';
  media?: string;
  text?: string;
  caption?: string;
  backgroundColor?: string;
  expiresAt?: string;
  createdAt?: string;
};

export async function getActiveStories(): Promise<ApiStory[]> {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    throw new Error('Utilisateur non connecté.');
  }

  const response = await fetch(`${API_BASE_URL}/stories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || result.message || 'Chargement des stories impossible.',
    );
  }

  return Array.isArray(result.data) ? result.data : [];
}

export type CreateStoryPayload = {
  type: 'image' | 'video' | 'text';
  media?: string;
  text?: string;
  caption?: string;
  backgroundColor?: string;
  file?: { uri: string; name: string; type: string };
};

export async function createStory(payload: CreateStoryPayload) {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    throw new Error('Utilisateur non connecté.');
  }

  // Ne pas definir Content-Type : fetch ajoute la frontiere multipart.
  const body = new FormData();
  body.append('type', payload.type);
  body.append('text', payload.text || '');
  body.append('caption', payload.caption || '');
  body.append('backgroundColor', payload.backgroundColor || '#3b5bdb');
  if (payload.file) body.append('media', payload.file);

  const response = await fetch(`${API_BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || result.message || 'Création de story impossible.',
    );
  }

  return result.data;
}
