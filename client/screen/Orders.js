import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import BookList from "../components/BookList";
import img from "../assets/parking-img.jpg";

const Orders = ({ navigation }) => {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "600", color: "#404258" }}>
        Orders
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: "row",
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("SaldoDetail")}
      >
        <FontAwesome5 name="wallet" size={20} color="#404258" />
        <View
          style={{
            width: "93%",
            marginLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 18, color: "#404258" }}>
            Saldo histories
          </Text>
          <FontAwesome5 name="chevron-right" size={20} color="#404258" />
        </View>
      </TouchableOpacity>

      <FlatList
        data={data}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookList item={item} img={img} navigation={navigation} />
        )}
        style={{ marginTop: 40 }}
      />
    </View>
  );
};
export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: 25,
    backgroundColor: "#ededed",
  },
});
