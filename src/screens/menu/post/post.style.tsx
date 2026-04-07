// src/screens/menu/post/post.style.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* ===== LAYOUT ===== */
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  /* ===== HEADER ===== */
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8eaef',
    backgroundColor: '#fff',
  },

  headerAction: {
    color: '#6dc2f7',
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    fontSize: 24,
    color: '#6dc2f7', // COLORS.primary
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  headerPublish: {
    backgroundColor: '#6dc2f7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },

  headerPublishText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  /* ===== CARD ===== */
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  /* ===== INPUT ===== */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingTop: 6,
  },

  /* ===== ACTIONS ===== */
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  mediaAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mediaText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6dc2f7',
    fontWeight: '500',
  },

  publishButton: {
    backgroundColor: '#84f76d',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 7,
  },

  publishText: {
    color: '#fff',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb", // gris clair moderne
    marginVertical: 12,
    marginLeft: 60,
  }
});
