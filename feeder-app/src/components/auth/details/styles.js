import { StyleSheet } from "react-native";
import Colors from "../../../colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "darkslategray",
    textAlign: "center",
  },
  subText: {
    fontSize: 11,
    color: "dimgray",
    textAlign: "center",
  },
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
  containerBottom: {
    padding: 10,
    alignItems: "center",
  },
  bottomButtonText: {
    color: Colors.primaryColor,
    fontSize: 11,
  },
});

export default styles;
