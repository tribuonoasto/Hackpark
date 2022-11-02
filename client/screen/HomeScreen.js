import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { Entypo, FontAwesome, Feather } from "react-native-vector-icons";

import { useState } from "react";
import Search from "../components/Search";

const HomeScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  console.log(searchPhrase);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#2E3049",
          height: 300,
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
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
              <Search
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#E3E7FA",
    borderColor: "#E3E7FA",
    borderRadius: 20,
    color: "#474E68",
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  searchBar__unclicked: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#E3E7FA",
    borderRadius: 20,
    alignItems: "center",
  },
  searchBar__clicked: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#E3E7FA",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
