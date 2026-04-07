// src/screens/menu/post/components/PostCard.component.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styles } from '../post.style';

export const PostCard = () => {
  return (
    <View style={styles.card}>
      {/* INPUT */}
      <View style={styles.inputRow}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />

        <TextInput
          placeholder="Exprimez-vous..."
          placeholderTextColor="#9ca3af"
          multiline
          style={styles.input}
        />
      </View>
      {/* 🔹 LIGNE ICI */}
      <View style={styles.divider} />
      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.mediaAction}>
          <MaterialIcons name="photo-library" size={22} color="#6dc2f7" />
          <Text style={styles.mediaText}>Photo / Vidéo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishText}>Publier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
