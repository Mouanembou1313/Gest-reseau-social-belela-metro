import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  backBtn: {
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },

  content: {
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },

  message: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
  },

  acceptBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#84f76d',
    borderRadius: 5,
  },

  rejectBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#6dc2f7',
    borderRadius: 5,
  },

  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
