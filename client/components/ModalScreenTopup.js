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

const ModalScreenTopup = ({ handleModal, setModalVisible, modalVisible }) => {
  // const handleSubmit = (codeName, bank) => {
  //     handleModal(codeName, bank);
  //   };
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
          onPress={() => setModalVisible(false)}
        >
          <Entypo name="cross" size={25} color="black" style={{ padding: 1 }} />
        </TouchableOpacity>
        {/* 
        <View
          style={{
            backgroundColor: "#ededed",
            flex: 1,
            marginTop: Constans.statusBarHeight,
            padding: 20,
            paddingTop: 100,
          }}
        >
          <FlatList
            data={banks}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  handleSubmit(item.codeName, item.name);
                  setModalVisible(false);
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                />
                <Text
                  style={{ marginLeft: 20, fontWeight: "600", fontSize: 16 }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View> */}
      </Modal>
    </View>
  );
};
export default ModalScreenTopup;
