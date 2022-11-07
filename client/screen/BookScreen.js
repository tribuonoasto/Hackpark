import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalScreen from "../components/ModalScreen";
import ModalScreenSlot from "../components/ModalScreenSlot";

const slotData = [
  {
    _id: "6364c5698b3a2b673173d4e1",
    VenueId: 1,
    slot: 104,
    floor: 1,
    name: "A1",
  },
  {
    _id: "6364c5e38b3a2b673173d4e2",
    VenueId: 1,
    slot: 80,
    floor: 1,
    name: "A2",
  },
  {
    _id: "6364c5e38b3a2b673173d4e3",
    VenueId: 2,
    slot: 90,
    floor: 2,
    name: "B1",
  },
  {
    _id: "6364c5e38b3a2b673173d4e3",
    VenueId: 2,
    slot: 10,
    floor: 2,
    name: "B2",
  },
];

const BookScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [textDate, setTextDate] = useState("Date");
  const [textTime, setTextTime] = useState("Time");
  const [name, setName] = useState("Area");
  const [saldo, setSaldo] = useState(10000);
  const [showSlot, setShowSlot] = useState(false);
  const { id } = route.params;

  const venues = slotData.filter((slot) => slot.VenueId === id);

  const venue = venues.filter((el) => el.name === name);

  const handleSubmit = (answer) => {
    setModalVisible(true);

    if (answer === "no") {
      return setModalVisible(false);
    }

    if (answer === "sure") {
      setModalVisible(false);
      console.log(date, venue[0]._id);
    }
  };

  const onChangeDate = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTextDate(tempDate.toLocaleDateString("en-us", options));
  };

  const onChangeTime = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempTime = new Date(currentDate);
    let options = {
      hour: "2-digit",
      minute: "2-digit",
    };

    setTextTime(tempTime.toLocaleTimeString("en-us", options));
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 350, paddingHorizontal: 20 }}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Parking Area <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TouchableOpacity onPress={() => setShowSlot(true)}>
              <Text style={styles.input}>{name}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Date <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TouchableOpacity onPress={() => showMode("date")}>
              <Text style={styles.input}>{textDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Time <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TouchableOpacity onPress={() => showMode("time")}>
              <Text style={styles.input}>{textTime}</Text>
            </TouchableOpacity>
          </View>

          {mode === "date" ? (
            <DateTimePicker
              testID="dateTimePicker"
              mode={mode}
              value={date}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          ) : mode === "time" ? (
            <DateTimePicker
              testID="dateTimePicker"
              mode={mode}
              value={date}
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          ) : null}
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#404258" }}>
            Venue
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Image
              source={require("../assets/parking-img.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                resizeMode: "cover",
                alignSelf: "center",
              }}
            />
            <View
              style={{
                marginVertical: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#50577A" }}
              >
                Indomaret
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "300", color: "#6B728E" }}
              >
                Jln. in aja dulu
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}
              >
                Slot
              </Text>
              <Text
                style={{ fontSize: 10, fontWeight: "300", color: "#474E68" }}
              >
                {name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}
              >
                Booking date
              </Text>
              <Text
                style={{ fontSize: 10, fontWeight: "300", color: "#474E68" }}
              >
                {`${textDate}, ${textTime}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#404258" }}
              >
                Booking price
              </Text>
              <Text
                style={{ fontSize: 10, fontWeight: "300", color: "#474E68" }}
              >
                Rp10.000
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#404258" }}>
            Total payment
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#404258" }}>
            Rp10.000
          </Text>
        </View>
      </ScrollView>
      {showSlot && (
        <ModalScreenSlot
          setShowSlot={setShowSlot}
          setName={setName}
          name={name}
          venues={venues}
        />
      )}
      <View>
        {saldo < 10000 ? (
          <View
            style={{
              backgroundColor: "#282C3D",
              paddingHorizontal: 20,
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#ededed", fontWeight: "600", fontSize: 16 }}>
              Top up your balance
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#ededed",
                marginLeft: 100,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
              }}
              onPress={() => navigation.navigate("TopupScreen")}
            >
              <Text
                style={{ color: "#ededed", fontWeight: "600", fontSize: 16 }}
              >
                Top up
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: saldo < 10000 ? "#dedede" : "#404258",
              paddingVertical: 13,
              paddingHorizontal: 10,
              borderRadius: 40,
            }}
            onPress={handleSubmit}
            disabled={saldo < 10000 ? true : false}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 24,
                fontWeight: "600",
                color: "#ededed",
              }}
            >
              Place your booking
            </Text>
          </TouchableOpacity>
        </View>

        {modalVisible && (
          <ModalScreen
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleSubmit={handleSubmit}
          />
        )}
      </View>
    </View>
  );
};
export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
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
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    color: "#404258",
  },
  inputWrapper: {
    marginBottom: 20,
  },
});
