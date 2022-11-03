import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import DetailUser from "./../components/DetailUser"

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://2f03-120-188-66-213.ap.ngrok.io/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <View style={style.content}>
      <FlatList
        data={users}
        renderItem={({item}) => <DetailUser props={item}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
