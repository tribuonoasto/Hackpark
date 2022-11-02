import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./DetailScreen";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTransparent: false,
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
    </Stack.Navigator>
  );
};
export default HomeStack;
