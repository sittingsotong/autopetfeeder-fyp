import { StyleSheet } from "react-native";
import Colors from "../../colors";

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: 50,
  },
  containerTop: {
    alignItems: "center",
    flexGrow: 1,
  },
  profileGrid: {
    marginTop: 10,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
  },
  containerBottom: {
    marginBottom: 20,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    marginTop: 20,
    borderRadius: 50,
    width: "30%",
    alignSelf: "center",
  },
});

export default styles;
