import { StyleSheet, Text, View } from "react-native";

export default function Booking() {
  return (
    <View style={style.content}>
      <Text>BOOKING</Text>
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
