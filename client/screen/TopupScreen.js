import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import { Feather, FontAwesome5 } from "react-native-vector-icons";
import ModalScreenBank from "../components/ModalScreenBank";

const TopupScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputBank, setInputBank] = useState("Select a top up method");

  const handleSubmit = () => {
    Keyboard.dismiss();
    setClicked(false);

    console.log(inputAmount, inputBank);
  };

  const handleModal = (bank) => {
    setModalVisible(true);
    if (typeof bank !== "object") {
      setInputBank(bank);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>
          Top up amount <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Rp 0"
            value={inputAmount}
            keyboardType="numeric"
            keyboardAppearance="default"
            onChangeText={setInputAmount}
            onFocus={() => setClicked(true)}
          />

          {clicked && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                top: 10,
              }}
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            >
              <FontAwesome5 name="check-circle" color="#ededed" size={24} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleModal}>
          <Text style={styles.label}>Top up with</Text>
          <View>
            <Text style={styles.input}>{inputBank}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#404258",
            borderRadius: 40,
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "600", color: "#ededed" }}
          >
            Confirm & top up
          </Text>
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <ModalScreenBank
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleModal={handleModal}
        />
      )}
    </View>
  );
};
export default TopupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 0,
  },
  input: {
    padding: 10,
    color: "#ededed",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    backgroundColor: "#6B728E",
    borderRadius: 10,
    overflow: "hidden",
    color: "#ededed",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    color: "#404258",
  },
  inputWrapper: {
    marginBottom: 20,
    padding: 20,
  },
});
