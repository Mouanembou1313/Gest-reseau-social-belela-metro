import AsyncStorage from "@react-native-async-storage/async-storage";

// Sur Android Emulator, localhost doit être remplacé par 10.0.2.2.
// Si tu testes sur un vrai téléphone, remplace 10.0.2.2 par l'adresse IP locale de ton PC.
const API_URL = "http://10.0.2.2:5000/api/v1/belela/users/auth";

// Connexion utilisateur
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  // Ton API renvoie success: false en cas d'erreur
  if (!response.ok || !result.success) {
    throw new Error(result.error || result.message || "Connexion impossible");
  }

  // On sauvegarde le token JWT et les infos utilisateur localement
  await AsyncStorage.setItem("token", result.token);
  await AsyncStorage.setItem("user", JSON.stringify(result.data));

  return result;
}

// Inscription utilisateur
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || result.message || "Inscription impossible");
  }

  // Après inscription, ton API renvoie aussi un token
  await AsyncStorage.setItem("token", result.token);
  await AsyncStorage.setItem("user", JSON.stringify(result.data));

  return result;
}

// Récupérer le token pour les futures requêtes protégées
export async function getToken() {
  return AsyncStorage.getItem("token");
}

// Récupérer l'utilisateur connecté
export async function getCurrentUser() {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Déconnexion
export async function logoutUser() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}