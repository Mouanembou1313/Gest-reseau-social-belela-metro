import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from '../home.style';
import { AppStackParamList } from '../../../../navigations/app.navigation';

type NavigationProp = StackNavigationProp<AppStackParamList>;

export const PostInputCard = () => {
    const navigation = useNavigation<NavigationProp>();

    const openGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });

        if (result.assets?.length) {
            navigation.navigate('Posts', {
                image: result.assets[0].uri,
            });
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.postInputRow}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100?img=11' }}
                    style={styles.avatar}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Exprimez-vous…"
                    placeholderTextColor="#9aa3b2"
                    onFocus={() => navigation.navigate('Posts')}
                />

                <TouchableOpacity style={styles.circleIcon} onPress={openGallery}>
                    <MaterialIcons name="photo-library" size={20} color="#6dc2f7" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
