import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  containerMain: {
    // flex: 1,
    margin: 20,
    padding: 20,
    width: "85%",
    height: "73%",
  },
  providerButton: {
    backgroundColor: Colors.tertiaryColor,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "30%",
    alignSelf: "center",
  },
  titleString: {
    fontSize: 23,
  },
});

export default styles;
