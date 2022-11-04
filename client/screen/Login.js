import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import { useState } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(email, password);
    navigation.navigate("TabScreen");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: "30%",
          }}
        >
          <Image
            style={{
              width: 250,
              height: 250,
              borderRadius: 200,
              resizeMode: "cover",
            }}
            source={require("../assets/login-img.jpg")}
          />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ marginTop: 50, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#404258",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Please login to your account
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                passwordRules
                secureTextEntry={true}
                keyboardType="visible-password"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
              />
            </View>
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                marginTop: 15,
                height: 40,
                borderWidth: 1,
                padding: 10,
                backgroundColor: "#404258",
                borderColor: "#404258",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EDEDED",
                  fontWeight: "400",
                  fontSize: 14,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                width: "100%",
              }}
            >
              <Text style={{ color: "#6B728E" }}>
                Don't have an account yet?{" "}
                <Text
                  style={{ color: "#404258" }}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#E3E7FA",
    borderColor: "#E3E7FA",
    borderRadius: 20,
    color: "#474E68",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    color: "#404258",
  },
});
