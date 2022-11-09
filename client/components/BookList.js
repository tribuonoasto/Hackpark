import { useLazyQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GET_VENUE_BY_SLOT_ID } from "../queries/bookings";

const BookList = ({ navigation, item }) => {
  const [getVenue, { loading, data, error, refetch }] =
    useLazyQuery(GET_VENUE_BY_SLOT_ID);

  useEffect(() => {
    getVenue({
      variables: {
        getSlotByIdId: item.SlotId,
      },
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [data, item])
  );

  const onChangeTime = (selectedDate) => {
    const currentDate = selectedDate || date;

    let tempTime = new Date(currentDate);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return tempTime.toLocaleTimeString("en-us", options);
  };

  if (loading || !data || data === null) {
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      ></View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: 1,
        borderColor: "rgba(64, 66, 88, 0.2)",
        paddingBottom: 20,
        marginBottom: 25,
      }}
      onPress={() => {
        navigation.navigate("OrderDetail", {
          id: item._id,
          status: item.paymentStatus,
        });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            loading || !data
              ? {
                  uri: "https://www.technipages.com/wp-content/uploads/2020/10/fix-google-maps-not-updating-location-600x341.png",
                }
              : { uri: data?.getSlotById?.Venue?.imgVenue }
          }
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
        <View style={{ marginLeft: 20, justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}>
              {data?.getSlotById?.Venue?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#50577A",
                marginTop: 5,
              }}
            >
              {item.transactionStatus}
            </Text>
          </View>
          <Text style={{ color: "#6B728E", fontSize: 10, fontWeight: "300" }}>
            {onChangeTime(item.bookingDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BookList;
