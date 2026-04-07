import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../home.style";

export const PostCard = () => {
    return (
        <View style={[styles.card, { paddingVertical: 12, paddingHorizontal: 12 }]}>
            <View style={styles.postHeader}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=11" }}
                    style={styles.avatar}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.postAuthor}>Jean Dupont</Text>
                    <Text style={styles.postTime}>il y a 2 h</Text>
                </View>
                <Icon name="dots-horizontal" size={20} color="#65708a" />
            </View>

            <Text style={styles.postText}>
                Voilà une belle journée pour coder avec React Native.
            </Text>

            <Image
                source={{ uri: "https://picsum.photos/400/200" }}
                style={styles.postImage}
            />

            <View style={styles.postFooter}>
                <View style={styles.footerLeft}>
                    <Icon name="thumb-up" size={16} color="#6dc2f7" />
                    <Text style={styles.footerStatText}> 45</Text>
                </View>
                <View style={styles.footerRight}>
                    <Text style={styles.footerStatText}>12 commentaires</Text>
                    <Text style={styles.footerDot}> · </Text>
                    <Text style={styles.footerStatText}>5 partages</Text>
                </View>
            </View>

            <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="thumb-up-outline" size={20} color="#65708a" />
                    <Text style={styles.actionText}>J’aime</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="comment-outline" size={20} color="#65708a" />
                    <Text style={styles.actionText}>Commenter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="share-outline" size={20} color="#65708a" />
                    <Text style={styles.actionText}>Partager</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
