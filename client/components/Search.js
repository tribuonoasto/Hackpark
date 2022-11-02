import { Entypo, Feather } from "react-native-vector-icons";
import { View, TextInput, Button, Keyboard, StyleSheet } from "react-native";

const Search = ({ clicked, setClicked, searchPhrase, setSearchPhrase }) => {
  return (
    <View style={styles.searchWrapper}>
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
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: "90%",
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
});
