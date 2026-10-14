import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../../../navigations/app.navigation';
import { PublicUser } from '../../../../services/social.service';
import { SocialAvatar } from './socialAvatar.component';
import { socialStyles as s } from './social.style';

export function PostInputCard({ user }: { user?: PublicUser | null }) {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  return (
    <View style={s.composer}>
      <SocialAvatar name={user?.username} uri={user?.profilePic} />
      <TouchableOpacity
        style={s.composerPrompt}
        onPress={() => navigation.navigate('Posts')}
        accessibilityLabel="Créer une publication"
      >
        <Text style={s.prompt}>Exprimez-vous...</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={s.iconButton}
        onPress={() => navigation.navigate('Posts', { pickMedia: true })}
        accessibilityLabel="Publier une photo ou une vidéo"
      >
        <MaterialIcons name="add-photo-alternate" size={24} color="#3b5bdb" />
      </TouchableOpacity>
    </View>
  );
}
