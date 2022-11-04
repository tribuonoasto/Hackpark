import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

const OrderDetail = () => {
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
          paddingBottom: 20,
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
            <View>
              <Text
                style={{ fontSize: 20, color: "#474E68", fontWeight: "500" }}
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
      <ScrollView style={{ marginTop: 20 }}>
        <View
          style={{
            marginBottom: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#2C2D3E", fontWeight: "700" }}>
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
          <Text style={{ fontSize: 14, fontWeight: "300", color: "#474E68" }}>
            31 February 2022, 14.11
          </Text>
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
            <Text style={{ color: "#404258" }}>Rp30.000</Text>
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
    padding: 20,
  },
});
