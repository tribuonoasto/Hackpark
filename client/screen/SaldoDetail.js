import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SaldoList from "../components/SaldoList";
import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_USER_BY_ID } from "../queries/user";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const SaldoDetail = () => {
  const [getUserId, { loading, error, data, refetch }] =
    useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      getUserId({
        variables: {
          getUserByIdId: +id,
        },
      });
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [data])
  );

  if (loading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.getUserById.BalanceHistories.filter(
          (el) => el.status === "Success"
        )}
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
