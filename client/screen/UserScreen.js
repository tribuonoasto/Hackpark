import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "react-native-vector-icons";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client";
import UserList from "../components/UserList";

const UserScreen = ({ navigation }) => {
  const [getUserId, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      const access_token = await AsyncStorage.getItem("access_token");
      getUserId({
        variables: {
          getUserByIdId: id,
        },
      });
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#404258" />
      </View>
    );
  }

  logout = async () => {
    AsyncStorage.clear();
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token, " <<< clear");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "#EDEDED",
          padding: 20,
        }}
      >
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: data?.getUserById.imgUrl }}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "cover",
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color: "#404258",
                    }}
                  >
                    {data?.getUserById.username}
                  </Text>
                  <Text style={{ marginTop: 5, color: "#50577A" }}>
                    {data?.getUserById.email}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditUserScreen")}
            >
              <FontAwesome5 name="pen" size={20} color="#404258" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#404258" }}>
              Account
            </Text>
            <UserList
              iconName={"history"}
              text={"My orders"}
              screen={"Orders"}
              navigation={navigation}
            />
            <UserList
              iconName={"car-alt"}
              text={"My vehicles"}
              screen={"MyVehicle"}
              navigation={navigation}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginBottom: 40,
            marginTop: 40,
            backgroundColor: "#B73E3E",
            paddingVertical: 14,
            borderRadius: 40,
          }}
          onPress={() => logout()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#EDEDED",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
  },
});
