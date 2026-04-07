import React from 'react';
import { TextInput } from 'react-native';

import { styles } from '../post.style';

export const PostInput = () => {
  return (
    <TextInput
      placeholder="Exprimez-vous..."
      placeholderTextColor="#999"
      multiline
      style={styles.input}
    />
  );
};
