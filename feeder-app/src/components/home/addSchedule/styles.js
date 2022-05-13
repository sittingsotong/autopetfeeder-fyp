import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  containerMain: {
    // marginTop: 50,
    padding: 5,
  },
  topBar: {
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  scheduleButton: {
    margin: 10,
    backgroundColor: Colors.highlightColor,
    padding: 15,
    borderRadius: 50,
  },
  dayItem: {
    marginLeft: 5,
    marginRight: 5,
  },
  exitButton: {
    // alignSelf: "center",
    backgroundColor: Colors.highlightColor,
    padding: 12,
    margin: 5,
    borderRadius: 50,
  },
});

export default styles;
