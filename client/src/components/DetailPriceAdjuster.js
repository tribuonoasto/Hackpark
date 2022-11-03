import React from "react";
import {Text, View } from "react-native";

export default function Detail({props}) {
  return (
    <View>
        <Text>Name: {props.name}</Text>
        <Text>Value: {props.value}</Text>
    </View>
  );
}