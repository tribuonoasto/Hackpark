import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalScreen = ({ handleSubmit, setModalVisible, modalVisible }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure want to book this spot?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleSubmit("sure")}
              >
                <Text style={styles.textStyle}>Sure</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose2]}
                onPress={() => handleSubmit("no")}
              >
                <Text style={styles.textStyle}>No Wait!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#54B435",
  },
  buttonClose2: {
    backgroundColor: "#B73E3E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#404258",
  },
});

export default ModalScreen;
