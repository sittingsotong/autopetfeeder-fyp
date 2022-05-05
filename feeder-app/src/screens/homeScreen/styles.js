import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 20,
  },
  containerBottom: {
    marginTop: "100%",
    alignItems: "center",
  },
  providerButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
  },
  sliderMain: {
    padding: 20,
    width: "120%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
