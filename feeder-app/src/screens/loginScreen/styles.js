import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "darkslategray",
    textAlign: "center",
  },
  containerBottom: {
    padding: 12,
    marginBottom: -15,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  subText: {
    fontSize: 14,
    color: "dimgray",
    textAlign: "center",
  },
  bottomButtonText: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
});

export default styles;
