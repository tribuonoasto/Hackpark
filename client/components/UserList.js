import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
const UserList = ({ iconName, text, screen, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
      onPress={() => navigation.navigate(screen)}
    >
      <FontAwesome5 name={iconName} size={20} color="#404258" />
      <View
        style={{
          width: "93%",
          marginLeft: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18, color: "#404258" }}>
          {text}
        </Text>
        <FontAwesome5 name="chevron-right" size={20} color="#404258" />
      </View>
    </TouchableOpacity>
  );
};
export default UserList;
