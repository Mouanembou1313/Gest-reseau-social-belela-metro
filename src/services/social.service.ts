import AsyncStorage from '@react-native-async-storage/async-storage';

const HOST = 'http://10.0.2.2:5000';
const API = HOST + '/api/v1/belela';
export type PublicUser = {
  _id: string;
  username: string;
  profilePic?: string;
  bio?: string;
};
export type AccountUser = PublicUser & {
  email?: string;
  customId?: string;
  authProvider?: string;
  isVerified?: boolean;
  createdAt?: string;
};

function accountFields(user: AccountUser): AccountUser {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    bio: user.bio,
    customId: user.customId,
    authProvider: user.authProvider,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
}

export async function getMyProfile() {
  const result = await request<{ data: AccountUser }>('/users/me');
  const user = accountFields(result.data);
  return user;
}

export async function updateMyProfile(
  id: string,
  username: string,
  bio: string,
) {
  const result = await request<{ data: AccountUser }>(
    '/users/' + encodeURIComponent(id),
    'PUT',
    { username, bio },
  );
  const user = accountFields(result.data);
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return user;
}
export type SuggestedUser = PublicUser & { mutual: number };
export type FriendRequest = {
  _id: string;
  sender: PublicUser;
  recipient: PublicUser;
  status: 'pending' | 'accepted';
};
export type PostItem = {
  _id: string;
  userId: PublicUser | null;
  content: string;
  media?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  liked?: boolean;
};
export type CommentItem = {
  _id: string;
  userId: PublicUser | null;
  text: string;
  createdAt: string;
};
export type MediaFile = { uri: string; name: string; type: string };

export function mediaUrl(value?: string) {
  if (!value) return '';
  return /^https?:\/\//.test(value)
    ? value
    : HOST + (value.startsWith('/') ? value : '/' + value);
}

async function request<T>(
  path: string,
  method = 'GET',
  body?: object | FormData,
): Promise<T> {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Connecte-toi pour continuer.');
  const multipart = body instanceof FormData;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90000);
  try {
    const response = await fetch(API + path, {
      method,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(!multipart ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body
        ? multipart
          ? (body as FormData)
          : JSON.stringify(body)
        : undefined,
    });
    const result = await response.json();
    if (!response.ok || !result.success)
      throw new Error(result.error || result.message || 'La requete a echoue.');
    return result as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError')
      throw new Error('Le serveur met trop de temps a repondre. Reessaie.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function getSuggestions() {
  return (await request<{ data: SuggestedUser[] }>('/users/suggestions')).data;
}
export async function dismissSuggestion(id: string) {
  await request('/users/suggestions/' + id + '/dismiss', 'POST');
}
export async function sendFriendRequest(id: string) {
  return (
    await request<{ data: FriendRequest }>(
      '/users/friend-requests/' + id,
      'POST',
    )
  ).data;
}
export async function getFriendRequests() {
  return (await request<{ data: FriendRequest[] }>('/users/friend-requests'))
    .data;
}
export async function respondToRequest(
  id: string,
  action: 'accept' | 'decline' | 'cancel',
) {
  await request('/users/friend-requests/' + id, 'PATCH', { action });
}
export async function getPosts(page = 1) {
  return request<{
    data: PostItem[];
    pagination?: { next?: { page: number } };
  }>(`/posts?page=${page}&rows=10`);
}
export async function publishPost(content: string, file?: MediaFile) {
  // fetch ajoute lui-meme le Content-Type multipart et sa frontiere.
  const body = new FormData();
  body.append('content', content);
  if (file) body.append('media', file);
  return (await request<{ data: PostItem }>('/posts', 'POST', body)).data;
}
export async function togglePostLike(id: string) {
  return request<{ liked: boolean; likesCount: number }>(
    '/likes/post/' + id + '/toggle',
    'POST',
  );
}
export async function deletePost(id: string) {
  await request('/posts/' + id, 'DELETE');
}
export async function getComments(id: string) {
  return (await request<{ data: CommentItem[] }>('/comments/post/' + id)).data;
}
export async function publishComment(postId: string, text: string) {
  return (
    await request<{ data: CommentItem }>('/comments', 'POST', { postId, text })
  ).data;
}

export function relativeTime(value: string) {
  const date = new Date(value);
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 60000),
  );
  if (!Number.isFinite(minutes)) return '';
  if (minutes < 1) return 'À l’instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)} h`;
  return date.toLocaleDateString('fr-FR');
}
