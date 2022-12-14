import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailScreen from "./DetailScreen";
import UserScreen from "./UserScreen";
import EditUserScreen from "./EditUserScreen";
import Orders from "./Orders";
import MyVehicle from "./MyVehicle";
import SaldoDetail from "./SaldoDetail";
import OrderDetail from "../components/OrderDetail";
import BookScreen from "./BookScreen";
import TopupScreen from "./TopupScreen";

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
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="MyVehicle"
        component={MyVehicle}
        options={{
          headerShown: true,
          headerTitle: "My Vehicle",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SaldoDetail"
        component={SaldoDetail}
        options={{
          headerShown: true,
          headerTitle: "Saldo History",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#EDEDED",
          },
          headerTitleStyle: {
            color: "#404258",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="TopupScreen"
        component={TopupScreen}
        options={{
          headerShown: true,
          headerTitle: "",
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
