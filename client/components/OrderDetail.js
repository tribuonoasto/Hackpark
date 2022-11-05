import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useEffect, useState } from "react";

const OrderDetail = ({ route }) => {
  const [status, setStatus] = useState("ongoing");
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const id = route.params;
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch(`https://3616-110-137-193-158.ap.ngrok.io/venues/${id}`)
      .then((response) => response.json())
      .then((json) => setVenues(json));
  }, []);

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
              alignItems: "flex-end",
            }}
          >
            {/* <FlatList
              data={venues}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => ( */}
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#474E68",
                  fontWeight: "500",
                }}
              >
                Indomaret
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#6B728E",
                  fontWeight: "300",
                  marginTop: 5,
                }}
              >
                Booking completed
              </Text>
            </View>
            {/* //   )}
            //   keyExtractor={(item) => item.id}
            // /> */}
            <View>
              <Text style={{ color: "#474E68", fontSize: 12 }}>
                31 February 2022, 11.11
              </Text>

              <Text style={{ color: "#474E68", fontSize: 12 }}>
                Booking ID ABCDE12345FGHI
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
          {status === "ongoing" ? (
            <Image source={require("../assets/qrcode.png")} />
          ) : (
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
          <Text style={{ fontSize: 14, fontWeight: "300", color: "#474E68" }}>
            31 February 2022, 11.11
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}>
            Check-out date
          </Text>
          {status === "ongoing" ? (
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#474E68" }}>
              -
            </Text>
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "300", color: "#474E68" }}>
              31 February 2022, 14.11
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
            <Text style={{ color: "#404258" }}>Booking fee</Text>
            <Text style={{ color: "#404258" }}>Rp10.000</Text>
          </View>
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
              <Text style={{ color: "#404258" }}>Rp30.000</Text>
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
              Rp40.000
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
