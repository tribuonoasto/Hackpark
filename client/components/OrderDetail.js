import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { GET_BOOKINGS_BY_ID, GET_VENUE_BY_SLOT_ID } from "../queries/bookings";

const OrderDetail = ({ route }) => {
  const { id, status } = route.params;
  console.log(id, status);
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const [order, { loading, error, data }] = useLazyQuery(GET_BOOKINGS_BY_ID);
  const [
    getVenue,
    { loading: venueLoading, data: venueData, error: venueError },
  ] = useLazyQuery(GET_VENUE_BY_SLOT_ID);

  useEffect(() => {
    order({ variables: { getBookingByIdId: id } });
  }, [id, status]);
  console.log(loading, error, data);

  useEffect(() => {
    if (data) {
      getVenue({
        variables: {
          getSlotByIdId: data?.getBookingById.SlotId,
        },
      });
    }
  }, [data]);
  console.log(venueLoading, venueData, venueError);

  const onChangeTime = (selectedDate) => {
    const currentDate = selectedDate || new Date();

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

  if (loading || venueLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
          padding: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "600", color: "#2C2D3E" }}>
            Order Summary
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, color: "#474E68", fontWeight: "500" }}
              >
                {venueData?.getSlotById.Venue.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#6B728E",
                  fontWeight: "300",
                  marginTop: 5,
                }}
              >
                {data?.getBookingById.paymentStatus}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#474E68", fontSize: 12, marginBottom: 5 }}>
                {onChangeTime(data?.getBookingById.bookingDate)}
              </Text>

              <Text style={{ color: "#474E68", fontSize: 12 }}>
                Booking ID {data?.getBookingById._id}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <View
          style={{
            marginBottom: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {status === "Done" ? (
            <View>
              <Text
                style={{ fontSize: 18, color: "#2C2D3E", fontWeight: "700" }}
              >
                How was the parking spot?
              </Text>
              <View
                style={{
                  height: 150,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AirbnbRating
                  reviewColor="#2C2D3E"
                  count={5}
                  reviews={["Bad", "Meh", "OK", "Good", "Amazing"]}
                  defaultRating={0}
                  size={35}
                  onFinishRating={ratingCompleted}
                />
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {data?.getBookingById.transactionStatus === "Expired" ? (
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  Your booking already expired
                </Text>
              ) : data?.getBookingById.transactionStatus === "Done" ? (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#2C2D3E",
                      fontWeight: "700",
                    }}
                  >
                    How was the parking spot?
                  </Text>
                  <View
                    style={{
                      height: 150,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AirbnbRating
                      reviewColor="#2C2D3E"
                      count={5}
                      reviews={["Bad", "Meh", "OK", "Good", "Amazing"]}
                      defaultRating={0}
                      size={35}
                      onFinishRating={ratingCompleted}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <Text>Please check-in before</Text>
                  <Text>{onChangeTime(data?.getBookingById.expiredDate)}.</Text>
                  <Image
                    source={{ uri: data?.getBookingById.imgQrCode }}
                    style={{
                      width: 250,
                      height: 250,
                      resizeMode: "contain",
                      marginVertical: 20,
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}>
            Check-in date
          </Text>

          {data?.getBookingById.checkinDate === null ? (
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#474E68" }}>
              -
            </Text>
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "300", color: "#474E68" }}>
              {data?.getBookingById.checkinDate}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}>
            Check-out date
          </Text>
          {data?.getBookingById.checkoutDate === null ? (
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#474E68" }}>
              -
            </Text>
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "300", color: "#474E68" }}>
              {data?.getBookingById.checkoutDate}
            </Text>
          )}
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={{ color: "#404258" }}>Parking fee</Text>
            {status === "ongoing" ? (
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#474E68" }}
              >
                -
              </Text>
            ) : (
              <Text style={{ color: "#404258" }}>
                Rp {data?.getBookingById.totalPrice}
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16, color: "#2C2D3E" }}>
              Total
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 18, color: "#2C2D3E" }}>
              Rp {data?.getBookingById.totalPrice}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
  },
});
