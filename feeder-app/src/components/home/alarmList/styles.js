import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  containerMain: {
    // flex: 1,
    padding: 40,
    width: "90%",
  },
  providerButton: {
    backgroundColor: Colors.tertiaryColor,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "30%",
    alignSelf: "center",
  },
});

export default styles;
