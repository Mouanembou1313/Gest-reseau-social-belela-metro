import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
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
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStory } from '../../../../services/story.service';
import { storyStyles as s } from './storyEditor.style';

type Mode = 'image' | 'video' | 'text';
type Props = { onClose: () => void; onPublished: () => void };
const colors = [
  '#3b5bdb',
  '#147d92',
  '#b52e66',
  '#573fa8',
  '#207b5b',
  '#252a32',
];

export function StoryEditor({ onClose, onPublished }: Props) {
  const [mode, setMode] = useState<Mode>('image');
  const [asset, setAsset] = useState<Asset>();
  const [text, setText] = useState('');
  const [caption, setCaption] = useState('');
  const [color, setColor] = useState(colors[0]);
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState('');
  const publishing = useRef(false);
  const choosing = useRef(false);

  async function chooseMedia(nextMode: Mode = mode) {
    if (nextMode === 'text' || choosing.current || publishing.current) return;
    choosing.current = true;
    setPicking(true);
    setError('');
    try {
      const result = await launchImageLibrary({
        mediaType: nextMode === 'video' ? 'video' : 'mixed',
        selectionLimit: 1,
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
      });
      if (result.didCancel) return;
      if (result.errorCode)
        throw new Error(result.errorMessage || 'Galerie indisponible');
      const selected = result.assets?.[0];
      if (!selected?.uri || !selected.type)
        throw new Error('Ce fichier ne peut pas etre ouvert.');
      if ((selected.fileSize || 0) > 30 * 1024 * 1024)
        throw new Error('Choisis un fichier de moins de 30 Mo.');
      if (
        ![
          'image/jpeg',
          'image/png',
          'image/webp',
          'video/mp4',
          'video/quicktime',
          'video/webm',
        ].includes(selected.type)
      ) {
        throw new Error(
          'Format non pris en charge. Choisis une image JPG, PNG, WebP ou une video MP4, MOV, WebM.',
        );
      }
      setMode(selected.type.startsWith('video/') ? 'video' : 'image');
      setAsset(selected);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible d'ouvrir la galerie.",
      );
    } finally {
      choosing.current = false;
      setPicking(false);
    }
  }

  async function publish() {
    if (publishing.current || choosing.current) return;
    if (mode === 'text' ? !text.trim() : !asset?.uri) return;
    publishing.current = true;
    setBusy(true);
    setError('');
    try {
      await createStory({
        type: mode,
        text: mode === 'text' ? text.trim() : '',
        caption: caption.trim(),
        backgroundColor: color,
        file:
          mode !== 'text' && asset?.uri
            ? {
                uri: asset.uri,
                type: asset.type!,
                name:
                  asset.fileName ||
                  (mode === 'video' ? 'story.mp4' : 'story.jpg'),
              }
            : undefined,
      });
      onPublished();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publication impossible.');
    } finally {
      publishing.current = false;
      setBusy(false);
    }
  }

  const canPublish =
    !busy && !picking && (mode === 'text' ? !!text.trim() : !!asset?.uri);
  return (
    <Modal
      visible
      animationType="slide"
      onRequestClose={() => {
        if (!publishing.current) onClose();
      }}
      onShow={() => {
        chooseMedia('image');
      }}
    >
      <SafeAreaView style={s.screen}>
        <KeyboardAvoidingView
          style={s.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={s.header}>
            <TouchableOpacity
              style={s.iconButton}
              accessibilityLabel="Fermer"
              disabled={busy}
              onPress={onClose}
            >
              <MaterialIcons name="close" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={s.heading}>Nouvelle story</Text>
            {mode !== 'text' && (
              <TouchableOpacity
                style={s.iconButton}
                accessibilityLabel="Changer de media"
                disabled={busy || picking}
                onPress={() => {
                  chooseMedia();
                }}
              >
                <MaterialIcons name="photo-library" size={24} color="#6dc2f7" />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[s.preview, mode === 'text' && { backgroundColor: color }]}
          >
            {mode === 'text' ? (
              <TextInput
                style={s.textInput}
                multiline
                maxLength={700}
                value={text}
                onChangeText={setText}
                editable={!busy}
                placeholder="Écris ta story..."
                placeholderTextColor="#ffffffaa"
                accessibilityLabel="Texte de la story"
              />
            ) : asset?.uri ? (
              mode === 'video' ? (
                <Video
                  source={{ uri: asset.uri }}
                  style={s.media}
                  resizeMode="contain"
                  controls
                  repeat
                  onError={() =>
                    setError(
                      'Impossible de lire cette video. Choisis un autre fichier.',
                    )
                  }
                />
              ) : (
                <Image
                  source={{ uri: asset.uri }}
                  style={s.media}
                  resizeMode="contain"
                  onError={() => setError('Impossible de lire cette image.')}
                />
              )
            ) : (
              <TouchableOpacity
                style={s.empty}
                disabled={picking}
                onPress={() => {
                  chooseMedia();
                }}
              >
                {picking ? (
                  <ActivityIndicator color="#6dc2f7" />
                ) : (
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={56}
                    color="#6dc2f7"
                  />
                )}
                <Text style={s.emptyText}>Choisir dans la galerie</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={s.toolbar}>
            <View style={s.tabs}>
              {(['image', 'video', 'text'] as Mode[]).map(item => (
                <TouchableOpacity
                  key={item}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: mode === item }}
                  disabled={busy || picking}
                  style={[s.tab, mode === item && s.activeTab]}
                  onPress={() => {
                    setError('');
                    setMode(item);
                    if (item !== 'text') {
                      setAsset(undefined);
                      chooseMedia(item);
                    }
                  }}
                >
                  <MaterialIcons
                    name={
                      item === 'image'
                        ? 'image'
                        : item === 'video'
                        ? 'videocam'
                        : 'text-fields'
                    }
                    size={20}
                    color={mode === item ? '#6dc2f7' : '#fff'}
                  />
                  <Text style={s.tabText}>
                    {item === 'image'
                      ? 'Image'
                      : item === 'video'
                      ? 'Vidéo'
                      : 'Texte'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {mode === 'text' && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.swatches}
              >
                {colors.map(value => (
                  <TouchableOpacity
                    key={value}
                    disabled={busy}
                    accessibilityLabel={`Fond ${value}`}
                    accessibilityState={{ selected: color === value }}
                    style={[
                      s.swatch,
                      { backgroundColor: value },
                      color === value && s.selectedSwatch,
                    ]}
                    onPress={() => setColor(value)}
                  />
                ))}
              </ScrollView>
            )}
            {!!error && (
              <Text accessibilityLiveRegion="polite" style={s.error}>
                {error}
              </Text>
            )}
            <View style={s.bottom}>
              <TextInput
                style={s.caption}
                value={caption}
                onChangeText={setCaption}
                editable={!busy}
                maxLength={220}
                placeholder="Ajouter une légende..."
                placeholderTextColor="#aab1bd"
                accessibilityLabel="Legende"
              />
              <TouchableOpacity
                accessibilityLabel="Publier la story"
                disabled={!canPublish}
                style={[s.publish, !canPublish && s.disabled]}
                onPress={() => {
                  publish();
                }}
              >
                {busy ? (
                  <ActivityIndicator color="#14171c" />
                ) : (
                  <MaterialIcons name="send" size={24} color="#14171c" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
