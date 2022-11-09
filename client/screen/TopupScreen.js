import { useMutation } from "@apollo/client";
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
import ModalScreenTopup from "../components/ModalScreenTopup";
import { TOPUP_BALANCE } from "../queries/user";

const TopupScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputBank, setInputBank] = useState("");
  const [bankName, setBankName] = useState("Select a top up method");
  const [topupBalance, { data, loading, error }] = useMutation(TOPUP_BALANCE);
  const [modalTopUp, setModalTopUp] = useState(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setClicked(false);

    topupBalance({
      variables: {
        totalPrice: +inputAmount,
        paymentStatus: "done",
        bank: inputBank,
      },
    })
      .then(() => setModalTopUp(true))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModal = (codeName, bank) => {
    setModalVisible(true);
    if (typeof codeName !== "object") {
      setInputBank(codeName);
      setBankName(bank);
    }
  };

  console.log(loading, data, error);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Processing your top up...</Text>
      </View>
    );
  }

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
            placeholderTextColor="#ededed"
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
            <Text style={styles.input}>{bankName}</Text>
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

      {modalTopUp && (
        <ModalScreenTopup
          modalVisible={modalTopUp}
          setModalVisible={setModalTopUp}
          data={data}
          bankName={bankName}
          navigation={navigation}
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
