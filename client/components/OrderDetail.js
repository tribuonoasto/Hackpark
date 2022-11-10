import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { GET_BOOKINGS_BY_ID, GET_VENUE_BY_SLOT_ID } from "../queries/bookings";
import { ADD_RATING, RATINGS, RATING_BY_ID } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const OrderDetail = ({ route }) => {
  const [showBtn, setShowBtn] = useState(false);
  const [venueRating, setVenueRating] = useState(0);
  const [rated, setRated] = useState(false);

  const { id, status } = route.params;

  const [order, { loading, error, data }] = useLazyQuery(GET_BOOKINGS_BY_ID);

  const [
    getVenue,
    {
      loading: venueLoading,
      data: venueData,
      error: venueError,
      refetch: venueRefetch,
    },
  ] = useLazyQuery(GET_VENUE_BY_SLOT_ID);

  const {
    loading: ratingsLoading,
    data: ratingsData,
    error: ratingsError,
    refetch,
  } = useQuery(RATINGS);

  useEffect(() => {
    refetch();
    order({ variables: { getBookingByIdId: id } });
  }, [id, status, venueData]);

  useEffect(() => {
    venueRefetch();
    if (data) {
      getVenue({
        variables: {
          getSlotByIdId: data?.getBookingById.SlotId,
        },
      });
    }
  }, [data, venueData]);

  const ratingCompleted = async (rating) => {
    setShowBtn(true);
    setVenueRating(rating);
  };

  const [
    addRating,
    { data: ratingData, loading: ratingLoading, error: ratingError },
  ] = useMutation(ADD_RATING);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [ratingsData])
  );

  useEffect(() => {
    (async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        const res = ratingsData?.getRatings.filter((rate) => {
          if (
            rate.UserId == userId &&
            venueData?.getSlotById?.Venue?._id === rate.VenueId
          ) {
            return rate;
          }
        });

        if (ratingsData.getRatings.length !== 0) {
          if (res?.length !== 0) {
            setRated(true);
            setVenueRating(res[0].rating);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [ratingsData, venueData]);

  const submitRating = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");

      addRating({
        variables: {
          rating: {
            UserId: +userId,
            VenueId: venueData?.getSlotById.Venue._id,
            rating: `${venueRating}`,
          },
        },
      });

      setVenueRating(venueRating);
      setShowBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  if (loading || venueLoading || ratingsLoading || ratingLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={require("../assets/shape-animation.gif")}
          style={{ width: 150, height: 150, resizeMode: "cover" }}
        />
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
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ fontSize: 16, color: "#474E68", fontWeight: "500" }}
              >
                {venueData?.getSlotById?.Venue?.name}
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
          {data?.getBookingById.transactionStatus === "Done" && (
            <View style={{ height: 250 }}>
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
                  defaultRating={venueRating}
                  size={35}
                  onFinishRating={ratingCompleted}
                  isDisabled={rated}
                />
              </View>

              {showBtn && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "darkgreen",
                    paddingVertical: 15,
                    padding: 10,
                    borderRadius: 40,
                  }}
                  onPress={submitRating}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ededed",
                      fontWeight: "600",
                      fontSize: 18,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {data?.getBookingById.transactionStatus === "Booked" && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
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

          {data?.getBookingById.transactionStatus === "Inprogress" && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
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

          {data?.getBookingById.transactionStatus === "Expired" && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {data?.getBookingById.transactionStatus === "Expired" ? (
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  Your booking already expired
                </Text>
              ) : data?.getBookingById.transactionStatus === "Done" ? (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
              ) : (
                status === "Book Paid"()
              )}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            <Text style={{ fontSize: 10, fontWeight: "300", color: "#474E68" }}>
              {onChangeTime(data?.getBookingById.checkinDate)}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}>
            Check-out date
          </Text>
          {data?.getBookingById.checkoutDate === null ? (
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#474E68" }}>
              -
            </Text>
          ) : (
            <Text style={{ fontSize: 10, fontWeight: "300", color: "#474E68" }}>
              {onChangeTime(data?.getBookingById.checkoutDate)}
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
                {formatter.format(data?.getBookingById.totalPrice)}
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
              {formatter.format(data?.getBookingById.totalPrice)}
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
