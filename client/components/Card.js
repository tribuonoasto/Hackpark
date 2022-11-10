import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";

const Card = ({ navigation, item }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => navigation.navigate("DetailScreen", { id: item._id })}
    >
      <View style={{ flexDirection: "row", padding: 10 }}>
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
            width: 240,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 70, justifyContent: "space-between" }}>
            <View>
              <Text
                style={{ fontWeight: "500", color: "#474E68", fontSize: 14 }}
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
                style={{ fontWeight: "500", fontSize: 12, color: "#50577A" }}
              >
                {formatter.format(item.bookingPrice)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
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
