import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import DetailBooking from "./../components/DetailBooking"

export default function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://2f03-120-188-66-213.ap.ngrok.io/bookings")
      .then((response) => response.json())
      .then((json) => setBookings(json));
  }, []);

  return (
    <View style={style.content}>
      <FlatList
        data={bookings}
        renderItem={({item}) => <DetailBooking props={item}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
