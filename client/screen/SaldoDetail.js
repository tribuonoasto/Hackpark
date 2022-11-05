import { View, Text, StyleSheet, FlatList } from "react-native";
import SaldoList from "../components/SaldoList";

const SaldoDetail = () => {
  const data = [
    { type: "credit" },
    { type: "debit" },
    { type: "credit" },
    { type: "debit" },
    { type: "credit" },
    { type: "credit" },
    { type: "debit" },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SaldoList item={item} />}
        style={{ marginTop: 40 }}
      />
    </View>
  );
};
export default SaldoDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 20,
  },
});
