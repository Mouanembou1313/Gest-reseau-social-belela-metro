import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { authStyles as s } from './auth.style';

type LayoutProps = {
  title: string;
  subtitle: string;
  compact?: boolean;
  onBack: () => void;
  children: React.ReactNode;
};
export function AuthLayout({
  title,
  subtitle,
  compact,
  onBack,
  children,
}: LayoutProps) {
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={s.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          source={require('../../../assets/images/9.jpg')}
          resizeMode="cover"
          style={[s.masthead, compact && s.compactMasthead]}
        >
          <View style={s.mastheadOverlay}>
            <View style={s.header}>
              <TouchableOpacity
                style={s.back}
                onPress={onBack}
                accessibilityLabel="Retour"
                accessibilityRole="button"
              >
                <MaterialIcons name="arrow-back" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={s.brand}>Belela</Text>
            </View>
          </View>
        </ImageBackground>
        <ScrollView
          style={s.fill}
          contentContainerStyle={s.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          <View style={s.heading}>
            <Text style={s.title}>{title}</Text>
            <Text style={s.subtitle}>{subtitle}</Text>
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FieldProps = TextInputProps & {
  label: string;
  icon: string;
  error?: string;
  helper?: string;
  onToggleSecure?: () => void;
};
export const AuthField = React.forwardRef<TextInput, FieldProps>(
  function AuthField(
    { label, icon, error, helper, onToggleSecure, ...inputProps },
    ref,
  ) {
    const [focused, setFocused] = useState(false);
    return (
      <View style={s.field}>
        <Text style={s.label}>{label}</Text>
        <View style={[s.inputRow, focused && s.focused, !!error && s.invalid]}>
          <MaterialIcons
            name={icon}
            size={20}
            color={focused ? '#3b5bdb' : '#8791a3'}
          />
          <TextInput
            {...inputProps}
            ref={ref}
            style={s.input}
            accessibilityLabel={label}
            placeholderTextColor="#a1abba"
            onFocus={event => {
              setFocused(true);
              inputProps.onFocus?.(event);
            }}
            onBlur={event => {
              setFocused(false);
              inputProps.onBlur?.(event);
            }}
          />
          {onToggleSecure && (
            <TouchableOpacity
              style={s.eye}
              disabled={inputProps.editable === false}
              onPress={onToggleSecure}
              accessibilityRole="button"
              accessibilityLabel={
                inputProps.secureTextEntry
                  ? 'Afficher le mot de passe'
                  : 'Masquer le mot de passe'
              }
            >
              <MaterialIcons
                name={
                  inputProps.secureTextEntry ? 'visibility-off' : 'visibility'
                }
                size={21}
                color="#8791a3"
              />
            </TouchableOpacity>
          )}
        </View>
        {!!helper && <Text style={s.helper}>{helper}</Text>}
        {!!error && (
          <Text accessibilityLiveRegion="polite" style={s.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

export function AuthError({ message }: { message: string }) {
  return message ? (
    <View style={s.errorBox} accessibilityLiveRegion="polite">
      <MaterialIcons name="error-outline" size={18} color="#bc3d50" />
      <Text style={s.errorBoxText}>{message}</Text>
    </View>
  ) : null;
}
export function AuthButton({
  label,
  busy,
  onPress,
}: {
  label: string;
  busy: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[s.button, busy && s.disabled]}
      disabled={busy}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
    >
      {busy ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Text style={s.buttonText}>{label}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </>
      )}
    </TouchableOpacity>
  );
}
export function GoogleButton({
  disabled,
  onPress,
}: {
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[s.googleButton, disabled && s.disabled]}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Image
        source={require('../../../assets/images/6.png')}
        style={s.googleIcon}
        resizeMode="contain"
      />
      <Text style={s.googleText}>Continuer avec Google</Text>
    </TouchableOpacity>
  );
}
export function AuthSeparator() {
  return (
    <View style={s.separator}>
      <View style={s.line} />
      <Text style={s.orText}>ou</Text>
      <View style={s.line} />
    </View>
  );
}
