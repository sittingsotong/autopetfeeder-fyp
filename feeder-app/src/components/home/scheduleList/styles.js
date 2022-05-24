import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20,
    padding: 20,
    width: "85%",
    // height: "60%",
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
