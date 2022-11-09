import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { FontAwesome5 } from "react-native-vector-icons";
import BookList from "../components/BookList";
import img from "../assets/parking-img.jpg";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_BOOKINGS, GET_BOOKINGS_BY_ID } from "../queries/bookings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Orders = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const { loading, data, error, refetch } = useQuery(GET_BOOKINGS);

  useEffect(() => {
    (async () => {
      refetch();
      const id = await AsyncStorage.getItem("id");

      const res = data?.getBookings.filter((booking) => booking.UserId == id);

      setBookings(res);
    })();
  }, [data, loading, error]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [bookings])
  );

  if (loading && !data) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

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
        data={bookings}
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
