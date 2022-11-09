import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Entypo,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "react-native-vector-icons";
import Card from "../components/Card";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_VENUES } from "../queries/bookings";
import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { GET_USER_BY_ID } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  const { loading, error, data } = useQuery(GET_VENUES);
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [userData, data])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let region = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation(region[0]);
    })();
  }, []);

  if (loading || userLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 250,
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        <View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontSize: 16, color: "#A1A9CC" }}>
                  Your location{" "}
                  <FontAwesome name="chevron-down" color="#A1A9CC" size={16} />
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: 10,
                  }}
                >
                  <Entypo name="location-pin" color="#A1A9CC" size={24} />
                  {!location ? (
                    <View></View>
                  ) : (
                    <Text
                      style={{ color: "#D9D9D9", fontSize: 18, marginLeft: 5 }}
                    >
                      {location.city}, {location.country}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserScreen")}
              >
                <Image
                  source={
                    userLoading || userData?.getUserById.imgUrl === null
                      ? require("../assets/user.jpg")
                      : { uri: userData?.getUserById.imgUrl }
                  }
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: "#6B728E",
                  fontWeight: "bold",
                  fontSize: 28,
                  marginTop: 20,
                }}
              >
                Let's find the best parking spot for you
              </Text>
              <TouchableOpacity
                style={styles.searchWrapper}
                onPress={() => navigation.navigate("SearchScreen")}
              >
                <Feather
                  name="search"
                  size={20}
                  color="black"
                  style={{ marginLeft: 1 }}
                />
                <View style={styles.input}>
                  <Text
                    style={{
                      color: "#909090",
                    }}
                  >
                    Search your spot...
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          paddingTop: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ededed",
        }}
      >
        <View
          style={{
            backgroundColor: "#5763A4",
            width: "90%",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                backgroundColor: "#ededed",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="wallet" size={20} color="#50577A" />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#50577A",
                  }}
                >
                  Saldo
                </Text>
              </View>
              <Text
                style={{ marginTop: 10, color: "#50577A", fontWeight: "600" }}
              >
                Rp {userData?.getUserById.balance}
              </Text>
            </View>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => navigation.navigate("TopupScreen")}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ededed",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: "#ededed", fontWeight: "600", fontSize: 14 }}
                >
                  Top up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          padding: 20,
          flex: 1,
          backgroundColor: "#ededed",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "#474E68",
            marginBottom: 20,
          }}
        ></Text>
        <FlatList
          data={data.getVenues}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              item={item}
              navigation={navigation}
              keyExtractor={(item) => item.id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3049",
  },
  searchWrapper: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 5,
    borderRadius: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#E3E7FA",
  },
  input: {
    height: 45,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#E3E7FA",
    borderColor: "#E3E7FA",
    borderRadius: 20,
    color: "#474E68",
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    justifyContent: "center",
  },
});
