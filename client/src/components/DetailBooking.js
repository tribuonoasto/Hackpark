import React from "react";
import {Text, View } from "react-native";

export default function Detail({props}) {
  return (
    <View>
        <Text>User Id: {props.UserId}</Text>
        <Text>Venue Id: {props.VenueId}</Text>
        <Text>Booking Date:{props.bookingDate}</Text>
        <Text>Expired Date: {props.expiredDate}</Text>
        <Text>Total Price: {props.totalPrice}</Text>
        <Text>Transaction Status: {props.transactionStatus}</Text>
        <Text>Payment Status: {props.paymentStatus}</Text>
    </View>
  );
}