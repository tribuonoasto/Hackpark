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
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";

const MyVehicle = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState();
  const [carName, setCarName] = useState("");
  const [carId, setCarId] = useState("");
  const [carType, setCarType] = useState("");

  const [getUserId, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      getUserId({
        variables: {
          getUserByIdId: id,
        },
      });
    })();
  }, []);

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

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });

    setUploadImage(formData);
  };

  const handleEdit = () => {
    console.log(uploadImage);
    // navigation.navigate("UserScreen");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

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
          {data?.getUserById.Vehicle?.imgUrl ? (
            <Image
              source={{ uri: data?.getUserById.Vehicle?.imgUrl }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                resizeMode: "cover",
              }}
            />
          ) : (
            <Image
              source={require("../assets/car.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
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
          <TextInput
            req
            style={styles.input}
            value={
              data?.getUserById.Vehicle?.name === null
                ? carName
                : data?.getUserById.Vehicle?.name
            }
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
            value={
              data?.getUserById.Vehicle?.plat === null
                ? carId
                : data?.getUserById.Vehicle?.plat
            }
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
            value={
              data?.getUserById.Vehicle?.modelName === null
                ? carType
                : data?.getUserById.Vehicle?.modelName
            }
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
