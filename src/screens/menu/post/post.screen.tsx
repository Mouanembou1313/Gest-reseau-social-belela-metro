// src/screens/menu/post/post.screen.tsx

import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './post.style';

import { Header } from "../../../../src/dry/components/header/header.component";
import { MenuDrawer } from "../../../dry/components/menudrawer/menudrawer.component";
import { PostCard } from './components/card.component';


export const PostScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ HEADER FIXE */}
      <Header onMenuPress={() => setDrawerVisible(true)} />
      <PostCard />

      {/* ✅ DRAWER PREMIUM */}
      <MenuDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />

    </SafeAreaView>
  );
};
