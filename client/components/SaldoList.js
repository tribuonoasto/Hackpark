import { Text, View, StyleSheet } from "react-native";

const SaldoList = ({ item }) => {
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

  return (
    <View style={styles.container}>
      {item.type === "kredit" ? (
        <Text style={{ color: "#B73E3E", fontSize: 18, fontWeight: "500" }}>
          - IDR {item.amount}
        </Text>
      ) : (
        <Text style={{ color: "#54B435", fontSize: 18, fontWeight: "500" }}>
          IDR {item.amount}
        </Text>
      )}

      <Text style={{ fontSize: 12, color: "#6B728E" }}>
        {onChangeTime(item.dateTransaction)}
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
