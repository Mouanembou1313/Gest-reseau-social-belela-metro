import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  deletePost,
  mediaUrl,
  PostItem,
  relativeTime,
  togglePostLike,
} from '../../../../services/social.service';
import { SocialAvatar } from './socialAvatar.component';
import { socialStyles as s } from './social.style';

type Props = {
  post: PostItem;
  myId?: string;
  onChange: (post: PostItem) => void;
  onDelete: (id: string) => void;
  onComment: (post: PostItem) => void;
};
export function PostCard({ post, myId, onChange, onDelete, onComment }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [playing, setPlaying] = useState(false);
  const focused = useIsFocused();
  function openComments() {
    setPlaying(false);
    onComment(post);
  }
  async function like() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const result = await togglePostLike(post._id);
      onChange({
        ...post,
        liked: result.liked,
        likesCount: result.likesCount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action impossible.');
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    setBusy(true);
    setError('');
    try {
      await deletePost(post._id);
      onDelete(post._id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suppression impossible.');
    } finally {
      setBusy(false);
    }
  }
  async function share() {
    try {
      await Share.share({
        message:
          (post.userId?.username || 'Belela') +
          '\n\n' +
          post.content +
          (post.media ? '\n' + mediaUrl(post.media) : ''),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Partage impossible.');
    }
  }
  return (
    <View style={s.post}>
      <View style={s.postHeader}>
        <SocialAvatar
          name={post.userId?.username}
          uri={post.userId?.profilePic}
        />
        <View style={s.author}>
          <Text style={s.authorName} numberOfLines={1}>
            {post.userId?.username || 'Utilisateur'}
          </Text>
          <Text style={s.time}>{relativeTime(post.createdAt)}</Text>
        </View>
        {post.userId?._id === myId && (
          <TouchableOpacity
            style={s.iconButton}
            disabled={busy}
            accessibilityLabel="Supprimer ma publication"
            onPress={() =>
              Alert.alert(
                'Supprimer la publication ?',
                'Cette action est définitive.',
                [
                  { text: 'Annuler', style: 'cancel' },
                  { text: 'Supprimer', style: 'destructive', onPress: remove },
                ],
              )
            }
          >
            <MaterialIcons name="delete-outline" size={22} color="#748094" />
          </TouchableOpacity>
        )}
      </View>
      {!!post.content && <Text style={s.content}>{post.content}</Text>}
      {!!post.media &&
        (post.mediaType === 'video' ? (
          playing ? (
            <Video
              source={{ uri: mediaUrl(post.media) }}
              style={s.media}
              controls
              resizeMode="contain"
              paused={!focused}
              onError={() => setError('Vidéo indisponible.')}
            />
          ) : (
            <TouchableOpacity
              style={s.videoCover}
              accessibilityLabel="Lire la vidéo"
              onPress={() => setPlaying(true)}
            >
              <MaterialIcons
                name="play-circle-filled"
                size={54}
                color="#6dc2f7"
              />
              <Text style={s.videoText}>Lire la vidéo</Text>
            </TouchableOpacity>
          )
        ) : (
          <Image
            source={{ uri: mediaUrl(post.media) }}
            style={s.media}
            resizeMode="cover"
            onError={() => setError('Image indisponible.')}
          />
        ))}
      <View style={s.metrics}>
        <View style={s.metric}>
          <MaterialIcons name="thumb-up" size={16} color="#6dc2f7" />
          <Text style={s.metricText}>{post.likesCount || 0}</Text>
        </View>
        <TouchableOpacity onPress={openComments}>
          <Text style={s.metricText}>
            {post.commentsCount || 0} commentaire(s)
          </Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={s.error}>{error}</Text>}
      <View style={s.actions}>
        <TouchableOpacity
          style={s.action}
          disabled={busy}
          onPress={like}
          accessibilityLabel={
            post.liked ? 'Retirer mon like' : 'Aimer la publication'
          }
        >
          {busy ? (
            <ActivityIndicator size="small" color="#3b5bdb" />
          ) : (
            <MaterialIcons
              name={post.liked ? 'thumb-up' : 'thumb-up-off-alt'}
              size={20}
              color={post.liked ? '#3b5bdb' : '#748094'}
            />
          )}
          <Text style={[s.actionText, post.liked && s.likedText]}>J’aime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.action} onPress={openComments}>
          <MaterialIcons name="chat-bubble-outline" size={20} color="#748094" />
          <Text style={s.actionText}>Commenter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.action} onPress={share}>
          <MaterialIcons name="share" size={20} color="#748094" />
          <Text style={s.actionText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
