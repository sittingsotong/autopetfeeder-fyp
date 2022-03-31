import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 40,
    color: "darkslategray",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
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
    padding: 10,
    alignItems: "center",
    paddingBottom: 40,
  },
  bottomButtonText: {
    color: Colors.primaryColor,
    fontSize: 11,
  },
  subText: {
    fontSize: 11,
    color: "dimgray",
    textAlign: "center",
  },
});

export default styles;
