import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  containerMain: {
    // margin: 30,
    height: "90%",
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 50,
    color: "darkslategray",
    textAlign: "center",
  },
  providerButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "60%",
    alignSelf: "center",
  },
  providerButtonText: {
    textAlign: "center",
  },
  containerBottom: {
    alignItems: "center",
  },
  containerBottomText: {
    padding: 12,
    marginBottom: -15,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomButtonText: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  subText: {
    fontSize: 14,
    color: "dimgray",
    textAlign: "center",
  },
});

export default styles;
