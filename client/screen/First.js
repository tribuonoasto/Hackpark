import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const First = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <Image style={styles.img} source={require("../assets/first.jpg")} />
        <View style={styles.darkBg}></View>

        <View style={styles.linearGradient}>
          <View>
            <View style={styles.content}>
              <Text
                style={{ fontSize: 24, fontWeight: "700", color: "#EDEDED" }}
              >
                Let's find the best parking spot for you
              </Text>
              <Text style={{ fontSize: 12, color: "#C7CCE0", marginTop: 10 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti aspernatur quas modi corporis consectetur ipsam
                praesentium quisquam aliquam ducimus numquam?
              </Text>
            </View>

            <View style={{ marginTop: 80 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: "#EDEDED",
                    fontSize: 16,
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Login with email
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "#EDEDED" }}>
                  Don't have an account yet?{" "}
                </Text>
                <Text
                  style={{ color: "#6B728E" }}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign up
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default First;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: -110,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
  },
  darkBg: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: -110,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  linearGradient: {
    borderRadius: 40,
    overflow: "hidden",
    width: "100%",
    height: 500,
    position: "absolute",
    bottom: -40,
    paddingTop: "15%",
    paddingLeft: 32,
    padding: 40,
  },
  wrapper: {
    borderRadius: 40,
    overflow: "hidden",
    flex: 1,
    position: "absolute",
    height: 500,
    paddingTop: "15%",
    paddingLeft: 32,
    padding: 40,
    right: 0,
    left: 0,
    top: 0,
  },
  button: {
    marginTop: 50,
    backgroundColor: "#5C88B0",
    padding: 16,
    borderRadius: 40,
    width: "100%",
  },
});
