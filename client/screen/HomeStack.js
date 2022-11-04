import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
import UserScreen from "./UserScreen";
import EditUserScreen from "./EditUserScreen";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={{
          headerShown: true,
          headerTitle: "Edit Profile",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
