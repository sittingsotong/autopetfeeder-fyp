import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    padding: 10,
    alignItems: "center",
  },
  subText: {
    fontSize: 11,
    color: "dimgray",
    textAlign: "center",
  },
  bottomButtonText: {
    color: Colors.primaryColor,
    fontSize: 11,
  },
});

export default styles;
