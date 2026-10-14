import { StyleSheet } from "react-native";

const CARD_RADIUS = 8;

export const styles = StyleSheet.create({
  homeContent: { paddingBottom: 32 },
  storyErrorPadding: { paddingHorizontal: 16, paddingBottom: 12 },
  container: {
    flex: 1,
    backgroundColor: "#f6f9fc",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f7",
  },

  logo: {
    fontSize: 24,
    color: "#6dc2f7",
    fontWeight: "800",
    letterSpacing: 0,
  },

  iconBtn: {
    padding: 6,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  postInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  textInput: {
    flex: 1,
    backgroundColor: "#f2f5f9",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  circleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7f3ff",
  },

  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b1e27",
  },

  storyCard: {
    width: 120,
    height: 188,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#cfd8e3",
    position: "relative",
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  storyImage: {
    width: "100%",
    height: "100%",
  },

  storyAvatar: {
    position: "absolute",
    top: 6,
    left: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#6dc2f7",
    zIndex: 20,
  },

  addBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#3b5bdb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 30,
    elevation: 30,
  },

  storyLabel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 10,
  },

  storyLabelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    paddingRight: 22,
  },
  storiesSection: { marginTop: 16, backgroundColor: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eef2f7' },
  storiesHeading: { padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  storyCount: { color: '#65708a', fontSize: 12 },
  storyTrack: { paddingHorizontal: 16, paddingBottom: 16 },
  storyTextBackground: { flex: 1, justifyContent: 'center', padding: 12, paddingTop: 42, paddingBottom: 42 },
  storyTextPreview: { fontSize: 17, lineHeight: 23, fontWeight: '700', color: '#fff', textAlign: 'center' },
  storyVideoBackground: { flex: 1, backgroundColor: '#207b5b', alignItems: 'center', justifyContent: 'center', gap: 8 },
  storyVideoText: { color: '#fff', fontSize: 12 },
  storyPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7f3ff' },
  avatarFallback: { backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontSize: 12, color: '#3b5bdb', fontWeight: '700' },

  storyStateBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    minHeight: 80,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#eef2f7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  storyStateText: {
    marginTop: 8,
    color: "#65708a",
    fontSize: 13,
    fontWeight: "600",
  },

  storyErrorText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  suggestionCard: {
    width: 170,
    backgroundColor: "#ffffff",
    borderRadius: CARD_RADIUS,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  suggestionAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },

  suggestionName: {
    fontWeight: "700",
    fontSize: 14,
    color: "#1b1e27",
  },

  suggestionMutual: {
    fontSize: 12,
    color: "#65708a",
    marginTop: 2,
    marginBottom: 10,
  },

  suggestionButtons: {
    flexDirection: "row",
  },

  pillBtn: {
    backgroundColor: "#e7f3ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d7e9ff",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  postAuthor: {
    fontWeight: "800",
    fontSize: 15,
    color: "#1b1e27",
  },

  postTime: {
    color: "#65708a",
    fontSize: 12.5,
    marginTop: 2,
  },

  postText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1b1e27",
    marginBottom: 8,
  },

  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },

  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerStatText: {
    fontSize: 13,
    color: "#65708a",
  },

  footerDot: {
    fontSize: 13,
    color: "#65708a",
    marginHorizontal: 4,
  },

  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eef2f7",
    paddingTop: 8,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actionText: {
    fontSize: 14,
    color: "#65708a",
    fontWeight: "600",
  },

  inputTouchable: {
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    justifyContent: "flex-end",
  },

  createStoryModal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },

  createStoryTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1b1e27",
    marginBottom: 16,
  },

  storyTypeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  storyTypeButton: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#f2f5f9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  storyTypeButtonActive: {
    backgroundColor: "#6dc2f7",
    borderColor: "#6dc2f7",
  },

  storyTypeText: {
    color: "#65708a",
    fontWeight: "700",
  },

  storyTypeTextActive: {
    color: "#ffffff",
  },

  createStoryInput: {
    backgroundColor: "#f6f9fc",
    borderWidth: 1,
    borderColor: "#eef2f7",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#1b1e27",
    fontSize: 14,
    marginBottom: 12,
  },

  createStoryTextArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  createStoryError: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },

  createStoryActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  cancelStoryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#f2f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelStoryText: {
    color: "#65708a",
    fontWeight: "800",
  },

  publishStoryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#6dc2f7",
    alignItems: "center",
    justifyContent: "center",
  },

  publishStoryText: {
    color: "#ffffff",
    fontWeight: "800",
  },
});
