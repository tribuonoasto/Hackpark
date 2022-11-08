import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SaldoList from "../components/SaldoList";
import { useQuery } from "@apollo/client";
import { GET_BALANCE } from "../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaldoDetail = async () => {
  const access_token = AsyncStorage.getItem("access_token");
  console.log(access_token, "<<<<");
  try {
    const { loading, error, data } = useQuery(GET_BALANCE, {
      variables: {
        access_token: await AsyncStorage.getItem("access_token"),
      },
    });
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#ededed" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data.getBalance}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SaldoList item={item} />}
          style={{ marginTop: 40 }}
        />
      </View>
    );
  } catch (error) {
    console.log(error);
  }
};
export default SaldoDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 20,
  },
});
