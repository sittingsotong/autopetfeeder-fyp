import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  alert: {
    backgroundColor: "white",
  },
  iconErr: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.highlightColor,
    width: "100%",
    borderRadius: 32,
  },
  icon: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    width: "100%",
    borderRadius: 32,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: "center",
    fontSize: 15,
  },
  btn: {
    borderRadius: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: "stretch",
    marginTop: 16,
    minWidth: "50%",
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#FFFFFF",
  },
});

export default styles;
