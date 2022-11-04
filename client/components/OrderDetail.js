import { Text, View, StyleSheet } from "react-native";

const OrderDetail = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "600", color: "#404258" }}>
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
            <Text style={{ fontSize: 18, color: "#474E68", fontWeight: "500" }}>
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
            <Text style={{ color: "#50577A" }}>31 February 2022, 11.11</Text>
          </View>
        </View>
      </View>
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
