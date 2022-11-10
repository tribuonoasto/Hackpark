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
  ActivityIndicator,
} from "react-native";

import Constants from "expo-constants";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../queries/user";

const Register = ({ navigation }) => {
  const [register, { data, loading, error }] = useMutation(REGISTER);
  const [username, SetUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register({
      variables: {
        register: {
          email: email,
          password: password,
          username: username,
          fullName: null,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.register !== null) {
      navigation.navigate("Login");
    }
  }, [data, loading, error]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

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
                Fill this form to save your spot!
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={SetUsername}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                passwordRules
                secureTextEntry={true}
                keyboardType="visible-password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <TouchableOpacity
              onPress={handleRegister}
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
                  onPress={() => navigation.navigate("Login")}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Register;

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
