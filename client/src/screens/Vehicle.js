import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import DetailVehicle from "./../components/DetailVehicle"

export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://2f03-120-188-66-213.ap.ngrok.io/vehicles")
      .then((response) => response.json())
      .then((json) => setVehicles(json));
  }, []);

  return (
    <View style={style.content}>
      <FlatList
        data={vehicles}
        renderItem={({item}) => <DetailVehicle props={item}/>}
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
