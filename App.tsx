import React, { useEffect } from "react";
import { AppNavigation } from "./src/navigations/app.navigation";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: "109218849059-4cn2aa9pgvnliifl81kdmmsi8dm70u6p.apps.googleusercontent.com",
        offlineAccess: false,
      });
    } catch (error) {
      console.log("Erreur GoogleSignin.configure:", error);
    }
  }, []);

  return <AppNavigation />;
}