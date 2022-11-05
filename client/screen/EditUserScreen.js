import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";

const EditUserScreen = ({ navigation }) => {
  const [name, setName] = useState("Anto Suprapto");
  const [email, setEmail] = useState("anto@mail.com");

  const handleEdit = () => {
    console.log(name, email);
    navigation.navigate("UserScreen");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={require("../assets/user.jpg")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 15,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#fff",
                position: "absolute",
                right: 5,
                bottom: 5,
                borderRadius: 100,
              }}
            ></View>
            <Ionicons name="ios-add-circle" size={30} color="#2192FF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 40 }}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Email <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            req
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#404258",
          paddingVertical: 10,
          borderRadius: 40,
        }}
        onPress={handleEdit}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ededed",
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default EditUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    padding: 20,
  },
  input: {
    height: 40,
    padding: 10,
    paddingLeft: 0,
    borderColor: "rgba(64, 66, 68, 0.1)",
    borderBottomWidth: 1,
    color: "#000",
    fontSize: 20,
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    color: "#404258",
  },
  inputWrapper: {
    marginBottom: 20,
  },
});
