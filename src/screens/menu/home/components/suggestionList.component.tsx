import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentUser } from '../../../../services/auth.service';
import {
  dismissSuggestion,
  getSuggestions,
  getFriendRequests,
  sendFriendRequest,
  respondToRequest,
  SuggestedUser,
  FriendRequest,
} from '../../../../services/social.service';
import { SocialAvatar } from './socialAvatar.component';
import { socialStyles as s } from './social.style';

export function SuggestionsList({ refreshKey = 0 }: { refreshKey?: number }) {
  const focused = useIsFocused();
  const [users, setUsers] = useState<SuggestedUser[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [myId, setMyId] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState<string[]>([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!focused) return;
    let alive = true;
    setLoading(true);
    setError('');
    Promise.all([getSuggestions(), getFriendRequests(), getCurrentUser()])
      .then(([suggestions, invitations, me]) => {
        if (alive) {
          setUsers(suggestions);
          setRequests(invitations);
          setMyId(me?._id || '');
          setSent([]);
        }
      })
      .catch(err => {
        if (alive) setError(err.message || 'Chargement impossible.');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [focused, refreshKey, reload]);

  async function action(id: string, type: 'send' | 'dismiss') {
    if (busy) return;
    setBusy(id);
    setError('');
    try {
      if (type === 'dismiss') {
        await dismissSuggestion(id);
        setUsers(previous => previous.filter(user => user._id !== id));
      } else {
        await sendFriendRequest(id);
        setSent(previous => [...previous, id]);
        setRequests(await getFriendRequests());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action impossible.');
    } finally {
      setBusy('');
    }
  }
  async function respond(id: string, type: 'accept' | 'decline' | 'cancel') {
    if (busy) return;
    setBusy(id);
    setError('');
    try {
      await respondToRequest(id, type);
      setRequests(previous => previous.filter(item => item._id !== id));
      setReload(value => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action impossible.');
    } finally {
      setBusy('');
    }
  }
  const received = requests.filter(item => item.recipient?._id === myId).length;
  return (
    <View style={s.section}>
      <View style={s.heading}>
        <Text style={s.title}>Personnes à découvrir</Text>
        <TouchableOpacity
          style={s.linkButton}
          onPress={() => setVisible(true)}
          accessibilityLabel="Voir les invitations"
        >
          <MaterialIcons name="people-outline" size={20} color="#3b5bdb" />
          <Text style={s.link}>
            Invitations{received ? ' (' + received + ')' : ''}
          </Text>
        </TouchableOpacity>
      </View>
      {!!error && (
        <Text accessibilityLiveRegion="polite" style={s.error}>
          {error}
        </Text>
      )}
      {loading ? (
        <View style={s.state}>
          <ActivityIndicator color="#3b5bdb" />
        </View>
      ) : users.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.track}
        >
          {users.map(user => (
            <View key={user._id} style={s.suggestion}>
              <SocialAvatar
                name={user.username}
                uri={user.profilePic}
                size={64}
              />
              <Text style={s.name} numberOfLines={2}>
                {user.username}
              </Text>
              <Text style={s.secondary}>
                {sent.includes(user._id)
                  ? 'Demande envoyée'
                  : user.mutual
                  ? user.mutual + ' ami(s) en commun'
                  : 'Membre de Belela'}
              </Text>
              <View style={s.suggestionActions}>
                <TouchableOpacity
                  style={[
                    s.iconButton,
                    s.primaryIcon,
                    (!!busy || sent.includes(user._id)) && s.disabled,
                  ]}
                  disabled={!!busy || sent.includes(user._id)}
                  accessibilityLabel={'Ajouter ' + user.username}
                  onPress={() => action(user._id, 'send')}
                >
                  {busy === user._id ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <MaterialIcons
                      name={
                        sent.includes(user._id) ? 'check' : 'person-add-alt-1'
                      }
                      size={22}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.iconButton}
                  disabled={!!busy}
                  accessibilityLabel={'Masquer ' + user.username}
                  onPress={() => action(user._id, 'dismiss')}
                >
                  <MaterialIcons name="close" size={22} color="#748094" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={s.state}>
          <Text style={s.secondary}>
            {error
              ? 'Les suggestions sont indisponibles.'
              : 'Aucune nouvelle suggestion pour le moment.'}
          </Text>
          <TouchableOpacity
            style={s.linkButton}
            onPress={() => setReload(value => value + 1)}
          >
            <Text style={s.link}>Actualiser</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <SafeAreaView style={s.modal}>
          <View style={s.modalHeader}>
            <Text style={s.title}>Invitations</Text>
            <TouchableOpacity
              style={s.iconButton}
              accessibilityLabel="Fermer"
              onPress={() => setVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#202632" />
            </TouchableOpacity>
          </View>
          {!!error && <Text style={s.error}>{error}</Text>}
          <ScrollView>
            {!requests.length && (
              <View style={s.state}>
                <Text style={s.secondary}>Aucune invitation en attente.</Text>
              </View>
            )}
            {requests.map(item => {
              const incoming = item.recipient?._id === myId;
              const user = incoming ? item.sender : item.recipient;
              return (
                <View key={item._id} style={s.row}>
                  <SocialAvatar name={user?.username} uri={user?.profilePic} />
                  <View style={s.rowBody}>
                    <Text style={s.authorName}>
                      {user?.username || 'Utilisateur'}
                    </Text>
                    <Text style={s.time}>
                      {incoming ? 'Souhaite vous ajouter' : 'Demande envoyée'}
                    </Text>
                    <View style={s.rowActions}>
                      {incoming && (
                        <TouchableOpacity
                          disabled={!!busy}
                          style={s.linkButton}
                          onPress={() => respond(item._id, 'accept')}
                        >
                          <Text style={s.link}>Accepter</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        disabled={!!busy}
                        style={s.linkButton}
                        onPress={() =>
                          respond(item._id, incoming ? 'decline' : 'cancel')
                        }
                      >
                        <Text style={s.time}>
                          {incoming ? 'Refuser' : 'Annuler'}
                        </Text>
                      </TouchableOpacity>
                      {busy === item._id && (
                        <ActivityIndicator color="#3b5bdb" />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
