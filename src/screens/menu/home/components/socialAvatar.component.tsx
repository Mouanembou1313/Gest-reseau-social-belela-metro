import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { mediaUrl } from '../../../../services/social.service';
import { socialStyles as s } from './social.style';

export function SocialAvatar({
  name = 'Utilisateur',
  uri,
  size = 44,
}: {
  name?: string;
  uri?: string;
  size?: number;
}) {
  const [failedUri, setFailedUri] = useState('');
  const url = mediaUrl(uri);
  const dimensions = { width: size, height: size, borderRadius: size / 2 };
  return url && failedUri !== url ? (
    <Image
      source={{ uri: url }}
      style={[s.avatar, dimensions]}
      onError={() => setFailedUri(url)}
    />
  ) : (
    <View style={[s.avatar, dimensions]}>
      <Text style={[s.initial, { fontSize: size / 3 }]}>
        {name.slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );
}
