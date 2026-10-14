import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Story } from '../data/home.data';
import { storyStyles as s } from './storyEditor.style';

type Props = { stories: Story[]; initialIndex: number; onClose: () => void };
export function StoryViewer({ stories, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [error, setError] = useState('');
  const story = stories[index];
  if (!story) return null;
  function move(step: number) {
    setError('');
    setIndex(value => value + step);
  }
  return (
    <Modal visible animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={s.screen}>
        <View style={s.progressRow}>
          {stories.map((item, i) => (
            <View
              key={item.id}
              style={[s.progress, i <= index && s.progressActive]}
            />
          ))}
        </View>
        <View style={s.header}>
          {!!story.avatar && (
            <Image
              source={{ uri: story.avatar }}
              style={s.viewerAvatar}
            />
          )}
          <Text style={s.heading} numberOfLines={1}>
            {story.name}
          </Text>
          <TouchableOpacity
            style={s.iconButton}
            accessibilityLabel="Fermer la story"
            onPress={onClose}
          >
            <MaterialIcons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            s.preview,
            story.type === 'text' && {
              backgroundColor: story.backgroundColor || '#3b5bdb',
            },
          ]}
        >
          {story.type === 'text' ? (
            <ScrollView
              contentContainerStyle={s.viewerScroll}
            >
              <Text style={s.viewerText}>{story.text}</Text>
            </ScrollView>
          ) : story.type === 'video' ? (
            <Video
              key={story.id}
              source={{ uri: story.img }}
              style={s.media}
              resizeMode="contain"
              controls
              repeat
              onError={() => setError('Video indisponible.')}
            />
          ) : (
            <Image
              source={{ uri: story.img }}
              style={s.media}
              resizeMode="contain"
              onError={() => setError('Image indisponible.')}
            />
          )}
        </View>
        {!!error && <Text style={[s.error, s.viewerError]}>{error}</Text>}
        {!!story.caption && <Text style={s.captionText}>{story.caption}</Text>}
        <View style={s.viewerControls}>
          <TouchableOpacity
            style={[s.iconButton, index === 0 && s.disabled]}
            disabled={index === 0}
            accessibilityLabel="Story précédente"
            onPress={() => move(-1)}
          >
            <MaterialIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={s.tabText}>
            {index + 1} / {stories.length}
          </Text>
          <TouchableOpacity
            style={s.iconButton}
            accessibilityLabel={
              index === stories.length - 1 ? 'Terminer' : 'Story suivante'
            }
            onPress={() => (index === stories.length - 1 ? onClose() : move(1))}
          >
            <MaterialIcons
              name={index === stories.length - 1 ? 'check' : 'chevron-right'}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
