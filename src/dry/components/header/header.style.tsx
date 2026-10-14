import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaf0f6',
  },
  brand: { flex: 1, justifyContent: 'center', gap: 2 },
  logo: { fontSize: 26, fontWeight: '800', color: '#6dc2f7', letterSpacing: 0 },
  section: { color: '#798598', fontSize: 11, fontWeight: '500' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f8fc',
  },
});
