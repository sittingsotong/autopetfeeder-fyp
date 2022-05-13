import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 50,
  },
  containerTop: {
    // marginTop: 50,
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
  modalContainer: {
    margin: 20,
    alignItems: "center",
  },
  containerBottom: {
    marginTop: 30,
    alignItems: "center",
  },
  scheduleButton: {
    margin: 10,
    backgroundColor: Colors.highlightColor,
    padding: 15,
    borderRadius: 50,
  },
});

export default styles;
