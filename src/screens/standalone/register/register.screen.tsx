import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../navigations/auth.navigation';
import { styles } from './register.style';
import { registerUser } from '../../../services/auth.service';
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

type RegisterScreenProps = {
  onRegisterSuccess: () => void;
};

export function RegisterScreen({ onRegisterSuccess }: RegisterScreenProps) {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [globalError, setGlobalError] = useState('');

  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }

    if (!/[A-Za-z]/.test(value)) {
      return 'Le mot de passe doit contenir au moins une lettre.';
    }

    if (!/[0-9]/.test(value)) {
      return 'Le mot de passe doit contenir au moins un chiffre.';
    }

    return '';
  };

  const validateForm = () => {
    let isValid = true;

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    setGlobalError('');

    if (!username.trim()) {
      setUsernameError('Le nom utilisateur est obligatoire.');
      isValid = false;
    } else if (username.trim().length < 3) {
      setUsernameError(
        'Le nom utilisateur doit contenir au moins 3 caractères.',
      );
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("L'adresse email est obligatoire.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Adresse email invalide. Exemple : nom@email.com');
      isValid = false;
    }

    const passwordValidation = validatePassword(password);
    if (!password) {
      setPasswordError('Le mot de passe est obligatoire.');
      isValid = false;
    } else if (passwordValidation) {
      setPasswordError(passwordValidation);
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Veuillez confirmer votre mot de passe.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas.');
      isValid = false;
    }

    if (!agreedTerms) {
      setTermsError("Veuillez accepter les conditions d'utilisation.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await registerUser(username.trim(), email.trim().toLowerCase(), password);

      // Inscription reussie : AppNavigation affiche onboarding puis loading puis home
      onRegisterSuccess();
    } catch (err: any) {
      setGlobalError(
        err.message || 'Inscription impossible. Veuillez réessayer.',
      );
    } finally {
      setLoading(false);
    }
  };
  // ---------------------------------------
  const handleGoogleRegister = async () => {
    try {
      setGlobalError('');
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // On demande à Google d'oublier le compte précédent,
      // mais on évite de bloquer l'application si signOut prend trop longtemps.
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

      onRegisterSuccess();
    } catch (err: any) {
      console.log('GOOGLE REGISTER ERROR:', err);
      setGlobalError(err.message || 'Inscription Google impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      compact
      title="Créer un compte"
      subtitle="Votre place dans la communauté."
      onBack={() => navigation.goBack()}
    >
      <AuthField
        label="Nom d’utilisateur"
        icon="person-outline"
        placeholder="Votre nom d’utilisateur"
        value={username}
        error={usernameError}
        editable={!loading}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
        textContentType="username"
        maxLength={32}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        onChangeText={value => {
          setUsername(value);
          setUsernameError('');
          setGlobalError('');
        }}
      />
      <AuthField
        ref={emailRef}
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
        placeholder="Créer un mot de passe"
        value={password}
        error={passwordError}
        helper="8 caractères minimum, une lettre et un chiffre."
        editable={!loading}
        secureTextEntry={securePassword}
        onToggleSecure={() => setSecurePassword(!securePassword)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="new-password"
        textContentType="newPassword"
        maxLength={128}
        returnKeyType="next"
        onSubmitEditing={() => confirmRef.current?.focus()}
        onChangeText={value => {
          setPassword(value);
          setPasswordError('');
          setConfirmPasswordError('');
          setGlobalError('');
        }}
      />
      <AuthField
        ref={confirmRef}
        label="Confirmer le mot de passe"
        icon="verified-user"
        placeholder="Répéter le mot de passe"
        value={confirmPassword}
        error={confirmPasswordError}
        editable={!loading}
        secureTextEntry={secureConfirm}
        onToggleSecure={() => setSecureConfirm(!secureConfirm)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="new-password"
        textContentType="newPassword"
        maxLength={128}
        returnKeyType="done"
        onSubmitEditing={handleRegister}
        onChangeText={value => {
          setConfirmPassword(value);
          setConfirmPasswordError('');
          setGlobalError('');
        }}
      />
      <TouchableOpacity
        style={styles.checkboxRow}
        disabled={loading}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreedTerms }}
        accessibilityLabel="Accepter les conditions d’utilisation"
        onPress={() => {
          setAgreedTerms(!agreedTerms);
          setTermsError('');
        }}
      >
        <View
          style={[
            styles.checkbox,
            agreedTerms && styles.checkboxChecked,
            !!termsError && styles.checkboxError,
          ]}
        >
          {agreedTerms && <MaterialIcons name="check" size={15} color="#fff" />}
        </View>
        <Text style={styles.checkboxText}>
          J’accepte les conditions d’utilisation.
        </Text>
      </TouchableOpacity>
      {!!termsError && (
        <Text accessibilityLiveRegion="polite" style={styles.errorText}>
          {termsError}
        </Text>
      )}
      <AuthError message={globalError} />
      <AuthButton
        label="Créer mon compte"
        busy={loading}
        onPress={handleRegister}
      />
      <AuthSeparator />
      <GoogleButton disabled={loading} onPress={handleGoogleRegister} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Déjà membre ?</Text>
        <TouchableOpacity
          style={styles.linkButton}
          disabled={loading}
          onPress={() => navigation.navigate('signin')}
        >
          <Text style={styles.link}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
