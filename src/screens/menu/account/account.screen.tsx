import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../../../dry/components/header/header.component';
import { MenuDrawer } from '../../../dry/components/menudrawer/menudrawer.component';
import { getCurrentUser } from '../../../services/auth.service';
import {
  AccountUser,
  getMyProfile,
  updateMyProfile,
} from '../../../services/social.service';
import { useLogout } from '../../../navigations/useLogout';
import { SocialAvatar } from '../home/components/socialAvatar.component';
import { styles as s } from './account.style';

const providers: Record<string, string> = {
  local: 'Email et mot de passe',
  google: 'Google',
  facebook: 'Facebook',
  twitter: 'Twitter',
  apple: 'Apple',
};
function joinedDate(value?: string) {
  const date = value ? new Date(value) : null;
  return date && Number.isFinite(date.getTime())
    ? date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : 'Non renseigné';
}
function InfoRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[s.row, last && s.lastRow]}>
      <View style={s.rowIcon}>
        <MaterialIcons name={icon} size={20} color="#6dc2f7" />
      </View>
      <View style={s.rowBody}>
        <Text style={s.label}>{label}</Text>
        <Text selectable style={s.value}>
          {value}
        </Text>
      </View>
    </View>
  );
}
export function AccountScreen() {
  const focused = useIsFocused();
  const [profile, setProfile] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const savingRef = useRef(false);
  const { logout, busy, error: logoutError } = useLogout();

  useEffect(() => {
    if (!focused) return;
    let alive = true;
    setLoading(true);
    setError('');
    async function load() {
      try {
        const cached = await getCurrentUser();
        if (alive && cached) setProfile(cached);
        const fresh = await getMyProfile();
        if (alive) setProfile(fresh);
      } catch (err) {
        if (alive)
          setError(err instanceof Error ? err.message : 'Profil indisponible.');
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [focused, refreshKey]);

  async function save() {
    if (!profile || savingRef.current) return;
    if (!name.trim()) {
      setEditError('Le nom est obligatoire.');
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setEditError('');
    try {
      const updated = await updateMyProfile(
        profile._id,
        name.trim(),
        bio.trim(),
      );
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : 'Modification impossible.',
      );
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }
  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      <Header title="Mon compte" onMenuPress={() => setDrawerVisible(true)} />
      <ScrollView
        contentContainerStyle={s.content}
        refreshControl={
          <RefreshControl
            refreshing={loading && !!profile}
            onRefresh={() => setRefreshKey(value => value + 1)}
            colors={['#6dc2f7']}
            tintColor="#6dc2f7"
          />
        }
      >
        {!profile && loading ? (
          <View style={s.state}>
            <ActivityIndicator color="#6dc2f7" />
          </View>
        ) : (
          profile && (
            <>
              <View style={s.profile}>
                <View style={s.avatarRing}>
                  <SocialAvatar
                    size={88}
                    name={profile.username}
                    uri={profile.profilePic}
                  />
                </View>
                <Text style={s.name} numberOfLines={2}>
                  {profile.username}
                </Text>
                {!!profile.email && (
                  <Text style={s.email} numberOfLines={2}>
                    {profile.email}
                  </Text>
                )}
                {profile.isVerified && (
                  <View style={s.badge}>
                    <MaterialIcons name="verified" size={15} color="#227b6b" />
                    <Text style={s.badgeText}>Compte vérifié</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={s.editButton}
                  accessibilityRole="button"
                  onPress={() => {
                    setName(profile.username);
                    setBio(profile.bio || '');
                    setEditError('');
                    setEditing(true);
                  }}
                >
                  <MaterialIcons name="edit" size={17} color="#3b5bdb" />
                  <Text style={s.editText}>Modifier le profil</Text>
                </TouchableOpacity>
              </View>
              <View style={s.sectionHeading}>
                <Text style={s.sectionTitle}>Informations personnelles</Text>
              </View>
              <View style={s.infoSection}>
                <InfoRow
                  icon="person-outline"
                  label="Nom d’utilisateur"
                  value={profile.username}
                />
                <InfoRow
                  icon="alternate-email"
                  label="Adresse email"
                  value={profile.email || 'Non renseignée'}
                />
                <InfoRow
                  icon="lock-outline"
                  label="Mode de connexion"
                  value={
                    providers[profile.authProvider || 'local'] ||
                    'Compte Belela'
                  }
                />
                <InfoRow
                  icon="calendar-today"
                  label="Membre depuis"
                  value={joinedDate(profile.createdAt)}
                  last
                />
              </View>
              <View style={s.sectionHeading}>
                <Text style={s.sectionTitle}>À propos</Text>
              </View>
              <View style={s.infoSection}>
                <Text style={s.biography}>
                  {profile.bio || 'Aucune bio pour le moment.'}
                </Text>
              </View>
            </>
          )
        )}
        {!!error && (
          <Text accessibilityLiveRegion="polite" style={s.error}>
            {error}
          </Text>
        )}
        {!!logoutError && <Text style={s.error}>{logoutError}</Text>}
        <View style={s.logoutArea}>
          <TouchableOpacity
            style={[s.logoutButton, busy && s.disabled]}
            disabled={busy}
            onPress={logout}
            accessibilityRole="button"
          >
            {busy ? (
              <ActivityIndicator color="#3b5bdb" />
            ) : (
              <MaterialIcons name="logout" size={20} color="#3b5bdb" />
            )}
            <Text style={s.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={editing}
        animationType="slide"
        onRequestClose={() => {
          if (!savingRef.current) setEditing(false);
        }}
      >
        <SafeAreaView style={s.modal}>
          <KeyboardAvoidingView
            style={s.fill}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Modifier le profil</Text>
              <TouchableOpacity
                style={s.iconButton}
                disabled={saving}
                accessibilityLabel="Fermer"
                onPress={() => setEditing(false)}
              >
                <MaterialIcons name="close" size={24} color="#526176" />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={s.form}
            >
              <Text style={s.fieldLabel}>Nom d’utilisateur</Text>
              <TextInput
                style={s.input}
                value={name}
                onChangeText={setName}
                editable={!saving}
                maxLength={32}
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Nom d’utilisateur"
              />
              <Text style={s.fieldLabel}>Bio</Text>
              <TextInput
                style={[s.input, s.bioInput]}
                value={bio}
                onChangeText={setBio}
                editable={!saving}
                multiline
                maxLength={280}
                placeholder="Quelques mots sur vous..."
                placeholderTextColor="#8791a3"
                accessibilityLabel="Bio"
              />
              {!!editError && <Text style={s.error}>{editError}</Text>}
              <TouchableOpacity
                style={[s.saveButton, (!name.trim() || saving) && s.disabled]}
                disabled={!name.trim() || saving}
                onPress={save}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={s.saveText}>Enregistrer</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
      <MenuDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </SafeAreaView>
  );
}
