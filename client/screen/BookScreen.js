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

const BookScreen = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [textDate, setTextDate] = useState("Date");
  const [textTime, setTextTime] = useState("Time");

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

  console.log(textTime, textDate);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 250 }}>
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
          ) : (
            <View></View>
          )}
        </View>
        <View>
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

        <TouchableOpacity
          style={{
            marginVertical: 20,
            backgroundColor: "#404258",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 40,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "600",
              color: "#ededed",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default BookScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
