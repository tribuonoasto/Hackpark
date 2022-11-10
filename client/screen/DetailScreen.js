import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_VENUES_BY_ID } from "../queries/bookings";

const DetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_VENUES_BY_ID, {
    variables: { getVenueByIdId: id },
  });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  if (loading) {
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
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: data.getVenueById.imgVenue }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
      <View style={styles.darkBg}></View>

      <ScrollView
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#EDEDED",
          height: "60%",
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          padding: 20,
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 28, color: "#404258", fontWeight: "600" }}>
              {data.getVenueById.name}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#85B6FF",
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {formatter.format(data.getVenueById.bookingPrice)}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "lightgreen",
            padding: 7,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "darkgreen", fontWeight: "500", fontSize: 16 }}>
            Available{" "}
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 18, color: "#474E68", fontWeight: "500" }}>
            About this spot
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B728E",
              marginVertical: 5,
              lineHeight: 13 * 1.5,
            }}
          >
            {data.getVenueById.description}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#474E68" }}>
              Address:{" "}
              <Text
                style={{ fontSize: 12, color: "#6B728E", fontWeight: "400" }}
              >
                {data.getVenueById.address}
              </Text>
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#474E68",
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                Price
              </Text>

              <View>
                <Text
                  style={{
                    marginVertical: 5,
                    color: "#50577A",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  First hour:{" "}
                  <Text style={{ color: "#6B728E", fontWeight: "400" }}>
                    {formatter.format(data.getVenueById.bookingPrice)}
                  </Text>
                </Text>
                <Text
                  style={{ color: "#50577A", fontSize: 14, fontWeight: "500" }}
                >
                  Next hour:{" "}
                  <Text style={{ color: "#6B728E", fontWeight: "400" }}>
                    {formatter.format(data.getVenueById.parkingPrice)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#404258",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 15,
            borderRadius: 40,
            marginTop: 10,
          }}
          onPress={() =>
            navigation.navigate("BookScreen", { id: data.getVenueById._id })
          }
        >
          <Text style={{ color: "#EDEDED", fontSize: 10, fontWeight: "600" }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  darkBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
