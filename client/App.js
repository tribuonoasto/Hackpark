import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import User from "./src/screens/User";
import Vehicle from "./src/screens/Vehicle";
import Venue from "./src/screens/Venue";
import PriceAdjuster from "./src/screens/PriceAdjuster";
import Booking from "./src/screens/Booking";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="User" component={User} />
        <Tab.Screen name="Vehicle" component={Vehicle} />
        <Tab.Screen name="Venue" component={Venue} />
        <Tab.Screen name="PriceAdjuster" component={PriceAdjuster} />
        <Tab.Screen name="Booking" component={Booking} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
