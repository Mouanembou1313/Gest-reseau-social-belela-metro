import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  brand: {
    color: '#6dc2f7',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 28,
  },
  title: { color: '#202632', fontSize: 24, lineHeight: 32, fontWeight: '700' },
  subtitle: {
    color: '#798598',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 28,
  },
  track: {
    height: 5,
    width: '100%',
    backgroundColor: '#e9f1f8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: { height: '100%', backgroundColor: '#6dc2f7', borderRadius: 3 },
  percent: {
    color: '#798598',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'right',
  },
});
