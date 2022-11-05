import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";

const Card = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => navigation.navigate("DetailScreen", { id: item.id })}
    >
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <Image
          source={{ uri: item.imgVenue }}
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
            width: 220,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 70, justifyContent: "space-between" }}>
            <View>
              <Text
                style={{ fontWeight: "500", color: "#474E68", fontSize: 16 }}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontWeight: "400", fontSize: 10, color: "#6B728E" }}
              >
                {item.address}
              </Text>
            </View>
            <View>
              <Text
                style={{ fontWeight: "500", fontSize: 14, color: "#50577A" }}
              >
                IDR {item.parkingPrice} /jam
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
    backgroundColor: "#ededed",
    padding: 5,
    borderRadius: 10,
  },
  shadow: {
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
