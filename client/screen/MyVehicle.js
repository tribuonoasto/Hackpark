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
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/user";
import { VEHICLE } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import axios from "axios";
import img from "../assets/car.jpg";

const MyVehicle = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [uploadImage, setUploadImage] = useState();
  const [carName, setCarName] = useState("");
  const [carId, setCarId] = useState("");
  const [carType, setCarType] = useState("");

  const [getUserId, { loading, error, data, refetch }] =
    useLazyQuery(GET_USER_BY_ID);

  const [
    createVehicle,
    { loading: vehicleLoading, error: errorVehicle, data: dataVehicle },
  ] = useMutation(VEHICLE);

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
  }, [data, dataVehicle]);

  const pickImage = async () => {
    try {
      setEdit(true);
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

      const access_token = await AsyncStorage.getItem("access_token");

      const { data: res } = await axios({
        url: `https://hackpark-service-user.herokuapp.com/vehicles/${data?.getUserById.Vehicle.id}`,
        method: "patch",
        data: formData,
        headers: {
          access_token: access_token,
        },
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    const id = AsyncStorage.getItem("id");
    createVehicle({
      variables: {
        vehicle: {
          modelName: carType,
          name: carName,
          plat: carId,
          UserId: +id,
        },
      },
    });
  };

  if (loading || vehicleLoading) {
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
        onPress={pickImage}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={
              image !== null
                ? { uri: image }
                : data?.getUserById?.Vehicle?.imgUrl === null
                ? img
                : data?.getUserById?.Vehicle?.imgUrl
                ? { uri: data?.getUserById?.Vehicle?.imgUrl }
                : img
            }
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              resizeMode: "cover",
            }}
          />

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
          <Text style={styles.label}>Name</Text>
          {data?.getUserById?.Vehicle?.name !== "" &&
          data?.getUserById?.Vehicle !== null ? (
            <Text style={styles.input}>{data?.getUserById.Vehicle?.name}</Text>
          ) : (
            <TextInput
              req
              style={styles.input}
              value={
                data?.getUserById?.Vehicle?.name === null
                  ? carName
                  : data?.getUserById.Vehicle?.name
              }
              onChangeText={setCarName}
            />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Plate number</Text>
          {data?.getUserById?.Vehicle?.plat !== "" &&
          data?.getUserById?.Vehicle !== null ? (
            <Text style={styles.input}>{data?.getUserById.Vehicle?.plat}</Text>
          ) : (
            <TextInput
              req
              style={styles.input}
              value={
                data?.getUserById?.Vehicle?.plat === null
                  ? carId
                  : data?.getUserById?.Vehicle?.plat
              }
              onChangeText={setCarId}
            />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Type</Text>
          {data?.getUserById.Vehicle?.modelName !== "" &&
          data?.getUserById?.Vehicle !== null ? (
            <Text style={styles.input}>
              {data?.getUserById.Vehicle?.modelName}
            </Text>
          ) : (
            <TextInput
              style={styles.input}
              value={
                data?.getUserById.Vehicle?.modelName === null
                  ? carType
                  : data?.getUserById.Vehicle?.modelName
              }
              onChangeText={setCarType}
            />
          )}
        </View>
      </View>

      {data?.getUserById.Vehicle?.modelName === "" ||
        data?.getUserById.Vehicle?.name === "" ||
        data?.getUserById.Vehicle?.plat === "" ||
        (data?.getUserById?.Vehicle === null && (
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
        ))}
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
