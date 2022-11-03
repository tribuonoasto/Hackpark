import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Entypo, FontAwesome, Feather } from "react-native-vector-icons";
import { useState } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Constants from "expo-constants";

const HomeScreen = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  // console.log(searchPhrase);
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#2E3049",
          height: 310,
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: Constants.statusBarHeight + 20,
        }}
      >
        <View>
          <View>
            <Text style={{ fontSize: 16, color: "#A1A9CC" }}>
              Your location{" "}
              <FontAwesome
                name="chevron-down"
                color="#A1A9CC"
                size={16}
                style={{ marginLeft: 20 }}
              />
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 15,
              }}
            >
              <Entypo name="location-pin" color="#A1A9CC" size={24} />
              <Text style={{ color: "#D9D9D9", fontSize: 18, marginLeft: 5 }}>
                Jakarta, Indonesia
              </Text>
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
              {/* <Search
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                navigation={navigation}
              /> */}
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
          flex: 1,
          width: "100%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "#474E68",
            marginBottom: 20,
          }}
        >
          Closest spot
        </Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card item={item} navigation={navigation} />
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
    position: "absolute",
    right: 0,
    left: 0,
    top: -60,
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
