import React from "react";
import {Text, View } from "react-native";

export default function Detail({props}) {
  return (
    <View>
        <Text>Username: {props.username}</Text>
        <Text>Email: {props.email}</Text>
    </View>
  );
}