import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const SaldoList = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.type === "credit" ? (
        <Text style={{ color: "#B73E3E", fontSize: 18, fontWeight: "500" }}>
           - IDR {item.amount}
        </Text>
      ) : (
        <Text style={{ color: "#54B435", fontSize: 18, fontWeight: "500" }}>
          IDR {item.amount}
        </Text>
      )}

      <Text style={{ fontSize: 12, color: "#6B728E" }}>
      {item.dateTransaction}
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
