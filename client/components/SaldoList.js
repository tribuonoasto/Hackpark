import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const SaldoList = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.type === "credit" ? (
        <Text style={{ color: "#B73E3E", fontSize: 18, fontWeight: "500" }}>
          -Rp 20.000
        </Text>
      ) : (
        <Text style={{ color: "#54B435", fontSize: 18, fontWeight: "500" }}>
          Rp 20.000
        </Text>
      )}

      <Text style={{ fontSize: 12, color: "#6B728E" }}>
        31 February 2022, 11.11
      </Text>
    </View>
  );
};
export default SaldoList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "rgba(64, 66, 88, 0.2)",
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
