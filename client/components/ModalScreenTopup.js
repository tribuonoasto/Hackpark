import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Constans from "expo-constants";
import { Entypo, Feather } from "react-native-vector-icons";

const ModalScreenTopup = ({
  handleModal,
  setModalVisible,
  modalVisible,
  data,
  bankName,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: Constans.statusBarHeight + 10,
            zIndex: 1,
          }}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate("HomeScreen");
          }}
        >
          <Entypo name="cross" size={25} color="black" style={{ padding: 1 }} />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#ededed",
            flex: 1,
            marginTop: Constans.statusBarHeight,
            padding: 20,
            paddingTop: 100,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: 24,
            }}
          >
            Top up Summary
          </Text>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{ fontSize: 16, flexWeight: "600", alignSelf: "center" }}
            >
              Order Id: {data?.payment.order_id}
            </Text>
            <View
              style={{
                marginVertical: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#404258",
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{ fontWeight: "300", fontSize: 12, color: "#ededed" }}
              >
                Your va number
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 28, color: "#ededed" }}
              >
                {data?.payment.va_numbers}
              </Text>
            </View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>Bank</Text>
                <Text style={{ fontSize: 14 }}>{bankName}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Payment type
                </Text>
                <Text style={{ fontSize: 14 }}>Bank Transfer</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Top up amount
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Rp {data?.payment.gross_amount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalScreenTopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 0,
  },
});
