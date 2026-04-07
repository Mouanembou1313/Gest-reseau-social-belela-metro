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
    paddingTop: 30,
    paddingBottom: 40,
    position: "relative",
  },

  title: {
    color: "#6dc2f7",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 35,
  },

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
    paddingVertical: 15,
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
    backgroundColor: "#3b5bdb",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 25,
    shadowColor: "#3b5bdb",
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

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 5,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#3b5bdb",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    minWidth: 20,
    minHeight: 20,
  },

  checkboxChecked: {
    backgroundColor: "#3b5bdb",
    borderColor: "#3b5bdb",
  },

  checkboxText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },

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
    marginHorizontal: 12,
    color: "#999",
    fontWeight: "500",
    fontSize: 14,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginVertical: 25,
  },

  circleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

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
    paddingVertical: 15,
    fontSize: 14,
    color: "#333",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 4,
    marginBottom: 30,
  },

  loginText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },

  loginLink: {
    color: "#3b5bdb",
    fontWeight: "700",
    fontSize: 14,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  backIcon: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  backText: {
    marginLeft: 1,
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  icon: {
    width: 24,
    height: 24,
  },
});