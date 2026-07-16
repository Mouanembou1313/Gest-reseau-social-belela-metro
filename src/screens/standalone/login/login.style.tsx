import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5f9",
  },

  keyboardView: {
    flex: 1,
  },

  top: {
    height: 200,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 22,
    paddingLeft: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -42,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 34,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 12,
  },

  title1: {
    color: "#6dc2f7",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#8A94A6",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 30,
  },

  fieldContainer: {
    marginBottom: 21,
  },

  passwordContainer: {
    marginBottom: 18,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    marginLeft: 4,
  },

  inputWrapper: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#1F2937",
  },

  passwordInputContainer: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    color: "#1F2937",
  },

  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FFF7F7",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 7,
    marginLeft: 4,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 14,
  },

  errorBoxText: {
    flex: 1,
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },

  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#6dc2f7",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  checkboxChecked: {
    backgroundColor: "#3b5bdb",
    borderColor: "#3b5bdb",
  },

  checkboxText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
  },

  forgotPassword: {
    color: "#6dc2f7",
    fontWeight: "800",
    fontSize: 13,
  },

  button: {
    height: 58,
    backgroundColor: "#6dc2f7",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 24,
    shadowColor: "#6dc2f7",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  buttonDisabled: {
    opacity: 0.75,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5EAF2",
  },

  orText: {
    marginHorizontal: 12,
    color: "#9CA3AF",
    fontWeight: "700",
    fontSize: 13,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginVertical: 18,
  },

  circleBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5EAF2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 5,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 5,
  },

  signupText: {
    color: "#8A94A6",
    fontSize: 14,
    fontWeight: "600",
  },

  signupLink: {
    color: "#6dc2f7",
    fontWeight: "800",
    fontSize: 14,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  backIcon: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  backText: {
    marginLeft: 2,
    fontSize: 16,
    color: "#fff",
    fontWeight: "800",
  },

  icon: {
    width: 24,
    height: 24,
  },
});