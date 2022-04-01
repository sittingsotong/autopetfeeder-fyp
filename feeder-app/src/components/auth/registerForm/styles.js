import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  textInput: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20, // margin is outside the component
    borderRadius: 30,
    width: "90%",
    alignSelf: "center",
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    marginTop: 20,
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default styles;
