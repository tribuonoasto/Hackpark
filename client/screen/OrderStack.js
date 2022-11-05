import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetail from "../components/OrderDetail";
import Orders from "./Orders";
import SaldoDetail from "./SaldoDetail";

const Stack = createNativeStackNavigator();
const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: "",
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
    </Stack.Navigator>
  );
};
export default OrderStack;
