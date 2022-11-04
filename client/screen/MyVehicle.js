import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const MyVehicle = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState();
  const [carName, setCarName] = useState("Cepmek");
  const [carId, setCarId] = useState("B 3 OL");
  const [carType, setCarType] = useState("Harimau");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("photo", { uri: localUri, name: filename, type });
    setUploadImage(formData);
  };

  // console.log(uploadImage._parts[0]);

  const handleEdit = () => {
    navigation.navigate("UserScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative" }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: "100%",
                resizeMode: "cover",
              }}
            />
          ) : (
            <Image
              source={require("../assets/car.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: "100%",
                resizeMode: "cover",
              }}
            />
          )}

          <TouchableOpacity
            onPress={pickImage}
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
                borderRadius: "100%",
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
          <TextInput
            req
            style={styles.input}
            value={carName}
            onChangeText={setCarName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Plate number <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            req
            style={styles.input}
            value={carId}
            onChangeText={setCarId}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            Type <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            req
            style={styles.input}
            value={carType}
            onChangeText={setCarType}
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
export default MyVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
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
