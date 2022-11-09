import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constans from "expo-constants";
import { Entypo } from "react-native-vector-icons";
import SelectList from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";

const ModalScreenSlot = ({ setShowSlot, setName, venues }) => {
  const [selected, setSelected] = useState("");
  const res = [];
  venues?.forEach((slot) => {
    res.push(slot.name);
  });

  let area = venues?.filter((el) => el.name === selected);

  const handleSubmit = () => {
    setShowSlot(false);
    if (selected) return setName(selected);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowSlot(false);
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
            setShowSlot(false);
            setName("Area");
          }}
        >
          <Entypo name="cross" size={25} color="black" style={{ padding: 1 }} />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#ededed",
            flex: 1,
            marginTop: Constans.statusBarHeight,
            paddingHorizontal: 20,
            paddingTop: 70,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 24, color: "#404258" }}>
            Choose slot
          </Text>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>
              Parking area <Text style={{ color: "red" }}>*</Text>
            </Text>
            <SelectList
              setSelected={setSelected}
              data={res}
              placeholder="Area"
              dropdownTextStyles={{
                color: "#404258",
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center",
              }}
              dropdownStyles={{
                width: 120,
              }}
              inputStyles={{
                color: "#404258",
                fontWeight: "600",
                fontSize: 18,
              }}
              boxStyles={{
                width: 120,
              }}
              search={false}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#50577A",
                padding: 10,
                width: 100,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 16,
                  color: "#ededed",
                }}
              >
                Floor
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  padding: 10,
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#ededed",
                }}
              >
                {area.length !== 0 ? area[0].floor : 0}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#50577A",
                padding: 10,
                width: 100,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 16,
                  color: "#ededed",
                }}
              >
                Slot
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  padding: 10,
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#ededed",
                }}
              >
                {area.length !== 0 ? area[0].slot : 0}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 100,
              backgroundColor: "#404258",
              borderRadius: 40,
              paddingVertical: 15,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 18,
                color: "#ededed",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default ModalScreenSlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: Constans.statusBarHeight + 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    color: "#404258",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
});
