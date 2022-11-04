import { View, StyleSheet, Text, Image } from "react-native";
import Constants from "expo-constants";

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/user.jpg")}
          style={{
            width: 60,
            height: 60,
            resizeMode: "cover",
            borderRadius: "100%",
            marginRight: 10,
          }}
        />
        <Text>Anto Suprapto</Text>
      </View>
    </View>
  );
};
export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    paddingTop: Constants.statusBarHeight + 20,
    padding: 20,
  },
});
