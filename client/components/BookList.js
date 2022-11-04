import { Text, View, Image, TouchableOpacity } from "react-native";

const BookList = ({ img, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: 1,
        borderColor: "rgba(64, 66, 88, 0.2)",
        paddingBottom: 20,
        marginBottom: 25,
      }}
      onPress={() => {
        navigation.navigate("OrderDetail");
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={img}
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />

        <View style={{ marginLeft: 20, justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#404258" }}>
              Indomaret
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#50577A",
                marginTop: 5,
              }}
            >
              Book completed
            </Text>
          </View>
          <Text style={{ color: "#6B728E", fontSize: 10, fontWeight: "300" }}>
            31 February 2022, 11.11
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BookList;
