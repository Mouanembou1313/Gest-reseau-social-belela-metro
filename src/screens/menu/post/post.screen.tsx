import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import { Header } from '../../../dry/components/header/header.component';
import { MenuDrawer } from '../../../dry/components/menudrawer/menudrawer.component';
import { getCurrentUser } from '../../../services/auth.service';
import { PublicUser, publishPost } from '../../../services/social.service';
import { SocialAvatar } from '../home/components/socialAvatar.component';
import { styles as s } from './post.style';

export function PostScreen() {
  const focused = useIsFocused();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<{
    key: string;
    name: string;
    params?: { image?: string; pickMedia?: boolean };
  }>();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [text, setText] = useState('');
  const [asset, setAsset] = useState<Asset>();
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const sending = useRef(false);
  const choosing = useRef(false);
  const initializedRoute = useRef('');

  async function choose() {
    if (choosing.current || sending.current) return;
    choosing.current = true;
    setPicking(true);
    setError('');
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 1,
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
      });
      if (result.didCancel) return;
      if (result.errorCode)
        throw new Error(result.errorMessage || 'Galerie indisponible.');
      const file = result.assets?.[0];
      if (!file?.uri || !file.type) throw new Error('Fichier indisponible.');
      if ((file.fileSize || 0) > 30 * 1024 * 1024)
        throw new Error('Choisissez un fichier de moins de 30 Mo.');
      if (
        ![
          'image/jpeg',
          'image/png',
          'image/webp',
          'video/mp4',
          'video/quicktime',
          'video/webm',
        ].includes(file.type)
      )
        throw new Error(
          'Format non pris en charge. Choisissez une image JPG, PNG, WebP ou une vidéo MP4, MOV, WebM.',
        );
      setAsset(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Galerie indisponible.');
    } finally {
      choosing.current = false;
      setPicking(false);
    }
  }
  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setError('Profil indisponible.'));
  }, []);
  useEffect(() => {
    if (initializedRoute.current === route.key) return;
    initializedRoute.current = route.key;
    if (route.params?.image)
      setAsset({
        uri: route.params.image,
        type: 'image/jpeg',
        fileName: 'photo.jpg',
      });
    else if (route.params?.pickMedia) choose();
  }, [route.key, route.params?.image, route.params?.pickMedia]);

  async function publish() {
    if (sending.current || choosing.current || (!text.trim() && !asset?.uri))
      return;
    sending.current = true;
    setBusy(true);
    setError('');
    try {
      await publishPost(
        text.trim(),
        asset?.uri
          ? {
              uri: asset.uri,
              type: asset.type!,
              name: asset.fileName || 'publication',
            }
          : undefined,
      );
      setText('');
      setAsset(undefined);
      if (route.name === 'Posts') navigation.goBack();
      else navigation.navigate('main', { screen: 'home' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publication impossible.');
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  const disabled = busy || picking || (!text.trim() && !asset?.uri);
  return (
    <SafeAreaView
      style={s.container}
      edges={
        route.name === 'Posts'
          ? ['top', 'bottom', 'left', 'right']
          : ['top', 'left', 'right']
      }
    >
      <Header title="Publication" onMenuPress={() => setDrawerVisible(true)} />
      <KeyboardAvoidingView
        style={s.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
        >
          <Text style={s.heading}>Nouvelle publication</Text>
          <View style={s.author}>
            <SocialAvatar name={user?.username} uri={user?.profilePic} />
            <View style={s.authorBody}>
              <Text style={s.name} numberOfLines={1}>
                {user?.username || 'Votre compte'}
              </Text>
              <Text style={s.audience}>Public · Belela</Text>
            </View>
          </View>
          <TextInput
            style={s.input}
            multiline
            maxLength={5000}
            value={text}
            onChangeText={setText}
            editable={!busy}
            placeholder="Qu’avez-vous envie de partager ?"
            placeholderTextColor="#8791a3"
            accessibilityLabel="Texte de la publication"
          />
          {asset?.uri &&
            (asset.type?.startsWith('video/') ? (
              <Video
                source={{ uri: asset.uri }}
                style={s.preview}
                resizeMode="contain"
                controls
                paused={!focused}
                onError={() => setError('Vidéo indisponible.')}
              />
            ) : (
              <Image
                source={{ uri: asset.uri }}
                style={s.preview}
                resizeMode="contain"
                onError={() => setError('Image indisponible.')}
              />
            ))}
          {!!asset && (
            <Text style={s.fileName} numberOfLines={1}>
              {asset.fileName || 'Média sélectionné'}
            </Text>
          )}
          <View style={s.mediaRow}>
            <TouchableOpacity
              style={s.mediaAction}
              disabled={busy || picking}
              onPress={choose}
            >
              {picking ? (
                <ActivityIndicator color="#3b5bdb" />
              ) : (
                <MaterialIcons
                  name="add-photo-alternate"
                  size={24}
                  color="#6dc2f7"
                />
              )}
              <Text style={s.mediaText}>
                {asset ? 'Changer le média' : 'Photo / Vidéo'}
              </Text>
            </TouchableOpacity>
            {!!asset && (
              <TouchableOpacity
                style={s.remove}
                disabled={busy}
                accessibilityLabel="Retirer le média"
                onPress={() => setAsset(undefined)}
              >
                <MaterialIcons name="close" size={24} color="#748094" />
              </TouchableOpacity>
            )}
          </View>
          {!!error && (
            <Text accessibilityLiveRegion="polite" style={s.error}>
              {error}
            </Text>
          )}
        </ScrollView>
        <View style={s.footer}>
          <TouchableOpacity
            disabled={disabled}
            style={[s.publishButton, disabled && s.disabled]}
            onPress={publish}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <MaterialIcons name="send" size={20} color="#fff" />
            )}
            <Text style={s.publishText}>
              {busy ? 'Publication...' : 'Publier'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <MenuDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </SafeAreaView>
  );
}
