import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';
import { styles } from './request.style';
import { SafeAreaView } from "react-native-safe-area-context";
const requestsData = [
  {
    id: '1',
    name: 'Paul Martin',
    message: 'Souhaite vous suivre',
  },
  {
    id: '2',
    name: 'Sarah Kane',
    message: 'Demande de connexion',
  },
];

export function RequestScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <RemixIcon name="arrow-left-line" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Demandes</Text>
      </View>

      <FlatList
        data={requestsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <RemixIcon name="user-add-fill" size={20} color="#6dc2f7" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.actionText}>Accepter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.actionText}>Refuser</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
