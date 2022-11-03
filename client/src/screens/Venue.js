import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import DetailVenue from "./../components/DetailVenue"

export default function Venue() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("https://2f03-120-188-66-213.ap.ngrok.io/venues")
      .then((response) => response.json())
      .then((json) => setVenues(json));
  }, []);

  return (
    <View style={style.content}>
      <FlatList
        data={venues}
        renderItem={({item}) => <DetailVenue props={item}/>}
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
