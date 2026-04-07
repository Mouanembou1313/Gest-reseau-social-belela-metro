import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styles } from './account.style';
import { Header } from "../../../../src/dry/components/header/header.component";
import { MenuDrawer } from "../../../dry/components/menudrawer/menudrawer.component";

import { ACCOUNT_DATA } from "./data/account.data"; // ✅ IMPORT DATA

export function AccountScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* HEADER */}
      <Header onMenuPress={() => setDrawerVisible(true)} />

      <ScrollView contentContainerStyle={styles.container}>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: ACCOUNT_DATA.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{ACCOUNT_DATA.name}</Text>
          <Text style={styles.email}>{ACCOUNT_DATA.email}</Text>
        </View>

        {/* INFO CARD - NOM */}
        <View style={styles.infoCard}>
          <MaterialIcons name="person" size={24} color="#84f76d" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{ACCOUNT_DATA.name}</Text>
          </View>
        </View>

        {/* INFO CARD - EMAIL */}
        <View style={styles.infoCard}>
          <MaterialIcons name="email" size={24} color="#84f76d" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{ACCOUNT_DATA.email}</Text>
          </View>
        </View>

        {/* INFO CARD - PHONE */}
        <View style={styles.infoCard}>
          <MaterialIcons name="phone" size={24} color="#84f76d" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{ACCOUNT_DATA.phone}</Text>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* DRAWER */}
      <MenuDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </SafeAreaView>
  );
}