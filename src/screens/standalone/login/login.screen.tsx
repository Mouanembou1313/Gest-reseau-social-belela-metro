import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigations/auth.navigation';
import { styles } from './login.style';
import { loginUser } from '../../../services/auth.service';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { loginWithGoogleToken } from '../../../services/authSocial.service';
import {
  AuthLayout,
  AuthField,
  AuthError,
  AuthButton,
  GoogleButton,
  AuthSeparator,
} from '../shared/auth.components';

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [secure, setSecure] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [globalError, setGlobalError] = useState('');

  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const validateForm = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setGlobalError('');

    if (!email.trim()) {
      setEmailError("L'adresse email est obligatoire.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Veuillez saisir une adresse email valide.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Le mot de passe est obligatoire.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await loginUser(email.trim().toLowerCase(), password);

      // Connexion reussie : AppNavigation affiche l'ecran loading puis home
      onLoginSuccess();
    } catch (err: any) {
      setGlobalError(
        err.message || 'Connexion impossible. Veuillez réessayer.',
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setGlobalError('');
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Force le choix du compte Google, sans bloquer l'app si signOut prend trop longtemps.
      try {
        await Promise.race([
          GoogleSignin.signOut(),
          new Promise<void>(resolve => {
            setTimeout(() => resolve(), 4000);
          }),
        ]);
      } catch (signOutError) {
        console.log('Google signOut ignoré:', signOutError);
      }

      await GoogleSignin.signIn();

      const tokens = await GoogleSignin.getTokens();

      if (!tokens.idToken) {
        setGlobalError("Google n'a pas retourné de idToken.");
        return;
      }

      await loginWithGoogleToken(tokens.idToken);

      // Après connexion Google : loading puis home
      onLoginSuccess();
    } catch (err: any) {
      console.log('GOOGLE LOGIN ERROR:', err);
      setGlobalError(err.message || 'Connexion Google impossible.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Retrouvez votre communauté."
      onBack={() => navigation.goBack()}
    >
      <AuthField
        label="Adresse email"
        icon="alternate-email"
        placeholder="vous@exemple.com"
        value={email}
        error={emailError}
        editable={!loading}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        maxLength={254}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        onChangeText={value => {
          setEmail(value);
          setEmailError('');
          setGlobalError('');
        }}
      />
      <AuthField
        ref={passwordRef}
        label="Mot de passe"
        icon="lock-outline"
        placeholder="Votre mot de passe"
        value={password}
        error={passwordError}
        editable={!loading}
        secureTextEntry={secure}
        onToggleSecure={() => setSecure(!secure)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
        onChangeText={value => {
          setPassword(value);
          setPasswordError('');
          setGlobalError('');
        }}
      />
      <AuthError message={globalError} />
      <AuthButton label="Se connecter" busy={loading} onPress={handleLogin} />
      <AuthSeparator />
      <GoogleButton disabled={loading} onPress={handleGoogleLogin} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Nouveau sur Belela ?</Text>
        <TouchableOpacity
          style={styles.linkButton}
          disabled={loading}
          onPress={() => navigation.navigate('signup')}
        >
          <Text style={styles.link}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
