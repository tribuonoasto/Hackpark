import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";

const Card = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => navigation.navigate("DetailScreen")}
    >
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Image
          source={require("../assets/parking-img.jpg")}
          style={{
            width: 70,
            height: 70,
            borderRadius: 5,
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            width: 200,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 70, justifyContent: "space-between" }}>
            <View>
              <Text
                style={{ fontWeight: "500", color: "#474E68", fontSize: 16 }}
              >
                Indomaret
              </Text>
              <Text
                style={{ fontWeight: "400", fontSize: 10, color: "#6B728E" }}
              >
                Jln. in aja dulu
              </Text>
            </View>
            <View>
              <Text
                style={{ fontWeight: "500", fontSize: 14, color: "#50577A" }}
              >
                Rp. 20,000
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FontAwesome5 name="map-pin" color="#404258" size={24} />
            <Text
              style={{
                marginLeft: 10,
                color: "#50577A",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              2.3 Km
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    height: 100,
    width: "95%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
