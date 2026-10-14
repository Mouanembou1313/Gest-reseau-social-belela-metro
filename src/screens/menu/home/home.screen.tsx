import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../../dry/components/header/header.component';
import { MenuDrawer } from '../../../dry/components/menudrawer/menudrawer.component';
import { PostInputCard } from './components/postInputCard.component';
import { StoriesList } from './components/storiesList.component';
import { SuggestionsList } from './components/suggestionList.component';
import { PostCard } from './components/postCard.component';
import { StoryEditor } from './components/storyEditor.component';
import { StoryViewer } from './components/storyViewer.component';
import { Story, StoryGroup } from './data/home.data';
import { groupStoriesByUser } from './data/storyGroups';
import { styles } from './home.style';
import { getActiveStories, ApiStory } from '../../../services/story.service';
import {
  getPosts,
  PostItem,
  PublicUser,
} from '../../../services/social.service';
import { Comments } from './components/comments.component';
import { socialStyles as social } from './components/social.style';

const API_HOST = 'http://10.0.2.2:5000';
function resolveImageUrl(value?: string) {
  if (!value) return '';
  if (/^https?:\/\//.test(value)) return value;
  return API_HOST + (value.startsWith('/') ? value : '/' + value);
}
function mapApiStoryToStory(story: ApiStory): Story {
  return {
    id: story._id,
    userId: story.userId?._id,
    createdAt: story.createdAt,
    name: story.userId?.username || 'Utilisateur',
    img: resolveImageUrl(story.media),
    avatar: resolveImageUrl(story.userId?.profilePic),
    type: story.type,
    text: story.text,
    caption: story.caption,
    backgroundColor: story.backgroundColor,
  };
}

export default function HomeScreen() {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState('');
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const feedBusy = useRef(false);
  const feedVersion = useRef(0);
  const nextPage = useRef<number | null>(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [stories, setStories] = useState<StoryGroup[]>([
    {
      id: 'me',
      name: 'Votre story',
      img: '',
      avatar: '',
      isMe: true,
      items: [],
    },
  ]);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const [storiesError, setStoriesError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [viewerStories, setViewerStories] = useState<Story[] | null>(null);
  const requestId = useRef(0);

  const loadStories = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setStoriesError('');
    try {
      const raw = await AsyncStorage.getItem('user');
      const user = raw ? JSON.parse(raw) : null;
      if (currentRequest === requestId.current) setCurrentUser(user);
      const avatar = resolveImageUrl(user?.profilePic);
      const myStory: Story = {
        id: 'me',
        name: 'Votre story',
        img: avatar,
        avatar,
        isMe: true,
        userId: user?._id,
      };
      if (currentRequest === requestId.current)
        setStories(previous => [
          { ...myStory, items: previous.find(item => item.isMe)?.items || [] },
          ...previous.filter(item => !item.isMe),
        ]);
      const apiStories = await getActiveStories();
      if (currentRequest !== requestId.current) return;
      setStories(
        groupStoriesByUser(
          apiStories.map(mapApiStoryToStory),
          user?._id,
          myStory,
        ),
      );
    } catch (err) {
      if (currentRequest === requestId.current)
        setStoriesError(
          err instanceof Error ? err.message : 'Chargement impossible.',
        );
    } finally {
      if (currentRequest === requestId.current) {
        setStoriesLoading(false);
      }
    }
  }, []);

  const loadFeed = useCallback(async (reset = false) => {
    if (!reset && (feedBusy.current || nextPage.current === null)) return;
    const version = reset ? ++feedVersion.current : feedVersion.current;
    feedBusy.current = true;
    setPostsLoading(true);
    setPostsError('');
    try {
      const result = await getPosts(reset ? 1 : nextPage.current!);
      if (version !== feedVersion.current) return;
      nextPage.current = result.pagination?.next?.page || null;
      setPosts(previous =>
        reset
          ? result.data
          : [
              ...new Map(
                [...previous, ...result.data].map(post => [post._id, post]),
              ).values(),
            ],
      );
    } catch (err) {
      if (version === feedVersion.current)
        setPostsError(err instanceof Error ? err.message : 'Fil indisponible.');
    } finally {
      if (version === feedVersion.current) {
        feedBusy.current = false;
        setPostsLoading(false);
      }
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadFeed(true);
      return () => {
        feedVersion.current += 1;
        feedBusy.current = false;
      };
    }, [loadFeed]),
  );

  function refreshHome() {
    setRefreshing(true);
    setRefreshKey(value => value + 1);
    Promise.all([loadStories(), loadFeed(true)]).finally(() =>
      setRefreshing(false),
    );
  }

  useEffect(() => {
    loadStories();
    return () => {
      requestId.current += 1;
    };
  }, [loadStories]);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header onMenuPress={() => setDrawerVisible(true)} />
      <FlatList
        data={posts}
        keyExtractor={post => post._id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            myId={currentUser?._id}
            onChange={updated =>
              setPosts(previous =>
                previous.map(post =>
                  post._id === updated._id ? updated : post,
                ),
              )
            }
            onDelete={id =>
              setPosts(previous => previous.filter(post => post._id !== id))
            }
            onComment={post => setCommentPostId(post._id)}
          />
        )}
        onEndReached={() => {
          if (!postsError) loadFeed();
        }}
        onEndReachedThreshold={0.35}
        contentContainerStyle={styles.homeContent}
        refreshControl={
          <RefreshControl
            tintColor="#3b5bdb"
            colors={['#3b5bdb']}
            refreshing={refreshing}
            onRefresh={refreshHome}
          />
        }
        ListHeaderComponent={
          <View>
            <PostInputCard user={currentUser} />
            <StoriesList
              stories={stories}
              loading={storiesLoading}
              error={storiesError}
              onAddStory={() => setEditorVisible(true)}
              onStoryPress={group => {
                if (group.items.length) setViewerStories(group.items);
                else if (group.isMe) setEditorVisible(true);
              }}
            />
            <SuggestionsList refreshKey={refreshKey} />
            <View style={social.heading}>
              <Text style={social.title}>Fil d’actualité</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          !postsLoading && !postsError ? (
            <View style={social.state}>
              <Text style={social.secondary}>
                Aucune publication pour le moment.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <View style={social.state}>
            {postsLoading && <ActivityIndicator color="#3b5bdb" />}
            {!!postsError && (
              <>
                <Text style={social.error}>{postsError}</Text>
                <TouchableOpacity onPress={() => loadFeed(true)}>
                  <Text style={social.link}>Réessayer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        }
      />
      {commentPostId && (
        <Comments
          postId={commentPostId}
          onClose={() => setCommentPostId(null)}
          onPosted={() =>
            setPosts(previous =>
              previous.map(post =>
                post._id === commentPostId
                  ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
                  : post,
              ),
            )
          }
        />
      )}
      {editorVisible && (
        <StoryEditor
          onClose={() => setEditorVisible(false)}
          onPublished={() => {
            setEditorVisible(false);
            loadStories();
          }}
        />
      )}
      {viewerStories !== null && (
        <StoryViewer
          stories={viewerStories}
          initialIndex={0}
          onClose={() => setViewerStories(null)}
        />
      )}
      <MenuDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </SafeAreaView>
  );
}
