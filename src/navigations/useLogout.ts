import { useRef, useState } from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { logoutUser } from '../services/auth.service';

export function useLogout() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);

  async function logout() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError('');
    try {
      await logoutUser();
      // Reinitialise la navigation racine pour ne pas revenir au compte avec Retour.
      let root = navigation;
      while (root.getParent()) root = root.getParent()!;
      root.reset({ index: 0, routes: [{ name: 'auth' }] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Déconnexion impossible.');
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return { logout, busy, error };
}
