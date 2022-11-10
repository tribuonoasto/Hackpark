import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import axios from "axios";
import img from "../assets/userImg.jpg";

const EditUserScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uploadImage, setUploadImage] = useState();
  const [image, setImage] = useState(null);

  const [
    getUserId,
    { loading: userLoading, error: userError, data: userData, refetch },
  ] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    (async () => {
      refetch();
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
    try {
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
      formData.append("image", { uri: localUri, name: filename, type });
      setUploadImage(formData);

      const access_token = await AsyncStorage.getItem("access_token");

      const { data } = await axios({
        url: "https://hackpark-service-user.herokuapp.com/users/changeImg",
        method: "patch",
        data: formData,
        headers: {
          access_token: access_token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (userLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={require("../assets/shape-animation.gif")}
          style={{ width: 150, height: 150, resizeMode: "cover" }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={pickImage}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={
              image !== null
                ? { uri: image }
                : !userData?.getUserById.imgUrl
                ? img
                : { uri: userData?.getUserById.imgUrl }
            }
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              resizeMode: "cover",
            }}
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 15,
            }}
            onPress={pickImage}
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
          <Text style={styles.label}>Name</Text>
          <Text style={styles.input}>
            {userData?.getUserById.username === null
              ? name
              : userData?.getUserById.username}
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.input}>
            {userData?.getUserById.email === null
              ? email
              : userData?.getUserById.email}
          </Text>
        </View>
      </View>
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
    padding: 0,
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
