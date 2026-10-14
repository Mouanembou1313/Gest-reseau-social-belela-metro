import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../home.style';
import { StoryGroup } from '../data/home.data';

type Props = {
  stories: StoryGroup[];
  loading?: boolean;
  error?: string;
  onAddStory?: () => void;
  onStoryPress?: (story: StoryGroup) => void;
};
export const StoriesList = ({
  stories,
  loading,
  error,
  onAddStory,
  onStoryPress,
}: Props) => (
  <View style={styles.storiesSection}>
    <View style={styles.storiesHeading}>
      <Text style={styles.sectionTitle}>Stories</Text>
      {loading ? (
        <ActivityIndicator color="#3b5bdb" size="small" />
      ) : (
        <Text style={styles.storyCount}>
          {stories.reduce((count, group) => count + group.items.length, 0)}{' '}
          moments
        </Text>
      )}
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.storyTrack}
    >
      {stories.map(story => (
        <TouchableOpacity
          key={story.id}
          activeOpacity={0.85}
          style={styles.storyCard}
          accessibilityLabel={
            story.isMe && !story.items.length
              ? 'Ajouter une story'
              : 'Stories de ' + story.name
          }
          onPress={() => onStoryPress?.(story)}
        >
          {story.type === 'text' ? (
            <View
              style={[
                styles.storyTextBackground,
                { backgroundColor: story.backgroundColor || '#3b5bdb' },
              ]}
            >
              <Text style={styles.storyTextPreview} numberOfLines={5}>
                {story.text}
              </Text>
            </View>
          ) : story.type === 'video' ? (
            <View style={styles.storyVideoBackground}>
              <MaterialIcons name="play-circle-filled" size={44} color="#fff" />
              <Text style={styles.storyVideoText}>Vidéo</Text>
            </View>
          ) : story.img ? (
            <Image source={{ uri: story.img }} style={styles.storyImage} />
          ) : (
            <View style={styles.storyPlaceholder}>
              <MaterialIcons
                name="add-photo-alternate"
                size={36}
                color="#3b5bdb"
              />
            </View>
          )}
          {story.avatar ? (
            <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
          ) : (
            <View style={[styles.storyAvatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitial}>
                {story.isMe ? 'Moi' : story.name.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
          <View pointerEvents="none" style={styles.storyLabel}>
            <Text style={styles.storyLabelText} numberOfLines={1}>
              {story.name}
            </Text>
          </View>
          {story.isMe && (
            <TouchableOpacity
              style={styles.addBadge}
              accessibilityLabel="Ajouter une story"
              hitSlop={8}
              onPress={event => {
                event.stopPropagation();
                onAddStory?.();
              }}
            >
              <MaterialIcons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
    {!!error && (
      <Text
        accessibilityLiveRegion="polite"
        style={[styles.storyErrorText, styles.storyErrorPadding]}
      >
        {error}
      </Text>
    )}
  </View>
);
