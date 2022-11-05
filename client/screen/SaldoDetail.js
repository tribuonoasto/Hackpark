import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import SaldoList from "../components/SaldoList";
const ngrok = require('./../config/apollo');

const SaldoDetail = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const [saldoHistories, setSaldoHistories] = useState([]);

  useEffect(() => {
    fetch(`${ngrok}/saldoHistories`)
      .then((response) => response.json())
      .then((json) => setSaldoHistories(json));
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
        data={saldoHistories}
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
