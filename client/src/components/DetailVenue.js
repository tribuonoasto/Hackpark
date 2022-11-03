import React from "react";
import { Text, View, Image } from "react-native";

export default function Detail({ props }) {
  return (
    <View>
      <Text>Name: {props.name}</Text>
      <Text>Address: {props.address}</Text>
      <Text>Slot: {props.slot}</Text>
      <Text>Parking Price: {props.parkingPrice} /jam</Text>
      <Text>Booking Price: {props.bookingPrice}</Text>
      <Image
        style={{
          width: 150,
          height: 150,
        }}
        source={{ uri: props.imgVenue }}
      />
    </View>
  );
}
