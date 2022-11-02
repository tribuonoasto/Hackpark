import { MaterialCommunityIcons, FontAwesome } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#2E3049",
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#2E3049",
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Home;
