import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: 50,
  },
  containerTop: {
    alignItems: "center",
  },
  feedButton: {
    backgroundColor: Colors.highlightColor,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "30%",
    alignSelf: "center",
  },
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
  modalContainer: {
    margin: 20,
    alignItems: "center",
  },
  containerBottom: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  scheduleButton: {
    marginBottom: 10,
    backgroundColor: Colors.highlightColor,
    padding: 15,
    borderRadius: 50,
  },
});

export default styles;
