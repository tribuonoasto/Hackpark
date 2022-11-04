import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Entypo, FontAwesome5, Feather } from "react-native-vector-icons";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const UserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://1b9a-110-137-193-158.ap.ngrok.io/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

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
              <FlatList
                data={users}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "cover",
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
              <View>
                <FlatList
                  data={users}
                  renderItem={({ item }) => (
                    <View>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 18,
                          color: "#404258",
                        }}
                      >
                        {" "}
                        {item.username}
                      </Text>
                      <Text style={{ marginTop: 5, color: "#50577A" }}>
                        {" "}
                        {item.email}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
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
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <FontAwesome5 name="history" size={20} color="#404258" />
              <View
                style={{
                  width: "93%",
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 18, color: "#404258" }}
                >
                  My orders
                </Text>
                <FontAwesome5 name="chevron-right" size={20} color="#404258" />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <FontAwesome5 name="car-alt" size={20} color="#404258" />
              <View
                style={{
                  width: "93%",
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 18, color: "#404258" }}
                >
                  My vehicles
                </Text>
                <FontAwesome5 name="chevron-right" size={20} color="#404258" />
              </View>
            </View>
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
          onPress={() => navigation.navigate("Login")}
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
