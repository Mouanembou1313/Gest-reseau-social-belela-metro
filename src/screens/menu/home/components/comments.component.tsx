import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CommentItem,
  getComments,
  publishComment,
  relativeTime,
} from '../../../../services/social.service';
import { SocialAvatar } from './socialAvatar.component';
import { socialStyles as s } from './social.style';

export function Comments({
  postId,
  onClose,
  onPosted,
}: {
  postId: string;
  onClose: () => void;
  onPosted: () => void;
}) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const sending = useRef(false);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    getComments(postId)
      .then(data => {
        if (alive) setComments(data);
      })
      .catch(err => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [postId, reload]);
  async function send() {
    if (!text.trim() || sending.current || loading) return;
    sending.current = true;
    setBusy(true);
    setError('');
    try {
      const comment = await publishComment(postId, text.trim());
      setComments(previous => [...previous, comment]);
      setText('');
      onPosted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Commentaire impossible.');
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  return (
    <Modal
      visible
      animationType="slide"
      onRequestClose={() => {
        if (!busy) onClose();
      }}
    >
      <SafeAreaView style={s.modal}>
        <KeyboardAvoidingView
          style={s.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={s.modalHeader}>
            <Text style={s.title}>Commentaires</Text>
            <TouchableOpacity
              disabled={busy}
              style={s.iconButton}
              onPress={onClose}
              accessibilityLabel="Fermer les commentaires"
            >
              <MaterialIcons name="close" size={24} color="#202632" />
            </TouchableOpacity>
          </View>
          {!!error && (
            <View>
              <Text style={s.error}>{error}</Text>
              <TouchableOpacity
                style={s.heading}
                onPress={() => setReload(value => value + 1)}
              >
                <Text style={s.link}>Réessayer</Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView style={s.fill} keyboardShouldPersistTaps="handled">
            {loading ? (
              <View style={s.state}>
                <ActivityIndicator color="#3b5bdb" />
              </View>
            ) : (
              !comments.length && (
                <View style={s.state}>
                  <Text style={s.secondary}>
                    Aucun commentaire pour le moment.
                  </Text>
                </View>
              )
            )}
            {comments.map(comment => (
              <View key={comment._id} style={s.row}>
                <SocialAvatar
                  name={comment.userId?.username}
                  uri={comment.userId?.profilePic}
                  size={36}
                />
                <View style={s.rowBody}>
                  <Text style={s.authorName}>
                    {comment.userId?.username || 'Utilisateur'}
                  </Text>
                  <Text style={s.bodyText}>{comment.text}</Text>
                  <Text style={s.time}>{relativeTime(comment.createdAt)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={s.commentInputRow}>
            <TextInput
              style={s.commentInput}
              multiline
              value={text}
              onChangeText={setText}
              maxLength={2000}
              editable={!busy}
              placeholder="Votre commentaire..."
              placeholderTextColor="#8791a3"
              accessibilityLabel="Votre commentaire"
            />
            <TouchableOpacity
              style={[
                s.iconButton,
                s.primaryIcon,
                (!text.trim() || busy || loading) && s.disabled,
              ]}
              disabled={!text.trim() || busy || loading}
              onPress={send}
              accessibilityLabel="Envoyer le commentaire"
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <MaterialIcons name="send" size={22} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
