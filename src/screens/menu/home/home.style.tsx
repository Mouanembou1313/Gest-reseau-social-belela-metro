import { StyleSheet } from 'react-native';

const CARD_RADIUS = 18;

export const styles = StyleSheet.create({
  /* ---------- Container ---------- */
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc', // COLORS.soft
  },

  /* ---------- Header ---------- */
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#ffffff', // COLORS.bg
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7', // COLORS.border
  },
  logo: {
    fontSize: 24,
    color: '#6dc2f7', // COLORS.primary
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 12,
  },

  /* ---------- Generic Card ---------- */
  card: {
    backgroundColor: '#ffffff', // COLORS.bg
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: '#eef2f7', // COLORS.border
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  /* ---------- Post Input ---------- */
  postInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f5f9',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  circleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3ff',
  },

  /* ---------- Stories ---------- */
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b1e27', // COLORS.text
  },
  storyCard: {
    width: 110,
    height: 170,
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#cfd8e3',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyAvatar: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#6dc2f7',
  },
  addBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6dc2f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyLabel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  storyLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  /* ---------- Suggestions ---------- */
  suggestionCard: {
    width: 170,
    backgroundColor: '#ffffff',
    borderRadius: CARD_RADIUS,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  suggestionAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  suggestionName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1b1e27',
  },
  suggestionMutual: {
    fontSize: 12,
    color: '#65708a',
    marginTop: 2,
    marginBottom: 10,
  },
  suggestionButtons: {
    flexDirection: 'row',
  },
  pillBtn: {
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7e9ff',
  },

  /* ---------- Post ---------- */
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAuthor: {
    fontWeight: '800',
    fontSize: 15,
    color: '#1b1e27',
  },
  postTime: {
    color: '#65708a',
    fontSize: 12.5,
    marginTop: 2,
  },
  postText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1b1e27',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerStatText: {
    fontSize: 13,
    color: '#65708a',
  },
  footerDot: {
    fontSize: 13,
    color: '#65708a',
    marginHorizontal: 4,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#65708a',
    fontWeight: '600',
  },
  inputTouchable: {
    flex: 1,
},

});
