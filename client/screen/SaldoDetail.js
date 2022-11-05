import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import SaldoList from "../components/SaldoList";

const SaldoDetail = () => {
  const [saldo, setSaldo] = useState([]);

  useEffect(() => {
    fetch("https://3616-110-137-193-158.ap.ngrok.io/saldoHistories")
      .then((response) => response.json())
      .then((json) => setSaldo(json));
  }, []);

  // const data = [
  //   { type: "credit" },
  //   { type: "debit" },
  //   { type: "credit" },
  //   { type: "debit" },
  //   { type: "credit" },
  //   { type: "credit" },
  //   { type: "debit" },
  // ];
  return (
    <View style={styles.container}>
      <FlatList
        data={saldo}
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
