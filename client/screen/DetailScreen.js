import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const DetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/detail.jpg")}
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
          padding: 40,
        }}
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
              Indomaret
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#85B6FF",
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              IDR 20.000
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "lightgreen",
              padding: 7,
              borderRadius: 5,
            }}
          >
            <Text
              style={{ color: "darkgreen", fontWeight: "500", fontSize: 16 }}
            >
              Available{" "}
            </Text>
            <Text
              style={{ color: "darkgreen", fontWeight: "500", fontSize: 14 }}
            >
              200 / 300
            </Text>
          </View>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            quisquam? Enim nihil sapiente facilis est sunt dolores. Ad, fugit
            sint.
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#474E68" }}>
              Address:{" "}
              <Text
                style={{ fontSize: 12, color: "#6B728E", fontWeight: "400" }}
              >
                Jln. in aja dulu
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
                    IDR 20.000
                  </Text>
                </Text>
                <Text
                  style={{ color: "#50577A", fontSize: 14, fontWeight: "500" }}
                >
                  Next hour:{" "}
                  <Text style={{ color: "#6B728E", fontWeight: "400" }}>
                    IDR 10.000
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#404258",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 80,
            paddingVertical: 15,
            borderRadius: 40,
          }}
        >
          <Text style={{ color: "#EDEDED", fontSize: 24, fontWeight: "600" }}>
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
