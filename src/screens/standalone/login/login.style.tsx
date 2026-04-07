import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5f9",
  },

  top: {
    height: 200,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingLeft: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 40,
    position: "relative",
  },

  title1: {
    color: "#6dc2f7",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },

  // 🔥 FIELD CONTAINER AVEC LABEL FLOTTANT
  fieldContainer: {
    marginBottom: 25,
    position: "relative",
  },

  fieldLabel: {
    position: "absolute",
    top: -12,
    left: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    zIndex: 10,
  },

  input: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  button: {
    backgroundColor: "#6dc2f7",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
    shadowColor: "#6dc2f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // 🔥 CHECKBOX ET FORGOT PASSWORD
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#6dc2f7",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  checkboxChecked: {
    backgroundColor: "#3b5bdb",
    borderColor: "#3b5bdb",
  },

  checkboxText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  forgotPassword: {
    color: "#6dc2f7",
    fontWeight: "600",
    fontSize: 14,
  },

  // 🔥 SEPARATOR
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },

  orText: {
    marginHorizontal: 10,
    color: "#999",
    fontWeight: "500",
    fontSize: 13,
  },

  // 🔥 SOCIAL
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 25,
  },

  circleBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  // 🔥 PASSWORD
  passwordContainer: {
    position: "relative",
    marginBottom: 25,
  },

  passwordLabelContainer: {
    position: "absolute",
    top: -12,
    left: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    zIndex: 10,
  },

  passwordLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },

  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: "#333",
  },

  // 🔥 SIGNUP LINK
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 4,
  },

  signupText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },

  signupLink: {
    color: "#6dc2f7",
    fontWeight: "700",
    fontSize: 14,
  },

  // ��� BACK BUTTON
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  backIcon: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  backText: {
    marginLeft: 2,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  icon: {
    width: 24,
    height: 24,
  },
});