import { Entypo, Feather } from "react-native-vector-icons";
import {
  View,
  TextInput,
  Button,
  Keyboard,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Constans from "expo-constants";
import { useState } from "react";
const Search = ({ clicked, setClicked, searchPhrase, setSearchPhrase }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setClicked(true);
      }}
    >
      <TouchableOpacity
        style={styles.searchWrapper}
        onPress={() => {
          setClicked(true);
        }}
      >
        <View
          style={
            clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
          }
        >
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />

          {clicked && (
            <Entypo
              name="cross"
              size={20}
              color="black"
              style={{ padding: 1 }}
              onPress={() => {
                setSearchPhrase("");
              }}
            />
          )}
        </View>

        {clicked && (
          <View>
            <Button
              title="Cancel"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            ></Button>
          </View>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: Constans.statusBarHeight,
    zIndex: 99,
  },
  searchWrapper: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 5,
    borderRadius: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#E3E7FA",
    alignSelf: "center",
    zIndex: 100,
  },
  input: {
    height: 45,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#E3E7FA",
    borderColor: "#E3E7FA",
    borderRadius: 20,
    color: "#474E68",
    fontSize: 20,
    marginLeft: 10,
    width: "95%",
  },
  searchBar__unclicked: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#E3E7FA",
    borderRadius: 20,
    alignItems: "center",
  },
  searchBar__clicked: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#E3E7FA",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
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
