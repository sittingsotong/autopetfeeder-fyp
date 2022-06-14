import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  containerTitle: {
    padding: 2,
    marginBottom: -15,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
  titleButton: {
    color: Colors.highlightColor,
    fontSize: 20,
  },
  graphContainer: {
    flex: 1,
  },
});

export default styles;
