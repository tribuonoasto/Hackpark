import React from "react";
import {Text, View } from "react-native";

export default function Detail({props}) {
  return (
    <View>
        <Text>User Id: {props.UserId}</Text>
        <Text>Plat: {props.plat}</Text>
        <Text>Model Name: {props.modelName}</Text>
        <Text>Type: {props.type}</Text>
    </View>
  );
}