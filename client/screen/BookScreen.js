import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalScreen from "../components/ModalScreen";
import ModalScreenSlot from "../components/ModalScreenSlot";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BOOKINGS, GET_SLOTS, GET_VENUES_BY_ID } from "../queries/bookings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_USER_BY_ID } from "../queries/user";

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
  const [
    booking,
    { data: bookingData, loading: bookingLoading, error: bookingError },
  ] = useMutation(BOOKINGS);

  console.log(bookingData, bookingError, bookingLoading);

  const [
    getUserId,
    {
      loading: userLoading,
      error: userError,
      data: userData,
      refetch: userRefetch,
    },
  ] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("id");
      getUserId({
        variables: {
          getUserByIdId: +id,
        },
      });
    })();
  }, []);

  const {
    loading: venueLoading,
    error: venueError,
    data: venueData,
    refetch: venueRefetch,
  } = useQuery(GET_VENUES_BY_ID, {
    variables: { getVenueByIdId: id },
  });

  const { loading, error, data, refetch } = useQuery(GET_SLOTS, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const venues = data?.getSlots.filter((slot) => {
    if (slot.VenueId === id && slot.slot > 0 && slot.slot !== null) return slot;
  });

  const slotRes = venues?.filter((el) => el.name === name);

  const onPressDate = () => {
    let isValidDate = Date.parse(textDate);
    showMode("date");

    if (isNaN(isValidDate)) {
      onChangeDate(new Date());
    }
  };

  const onPressTime = () => {
    let isValidDate = Date.parse(textTime);
    showMode("time");

    if (isNaN(isValidDate)) {
      onChangeTime(new Date());
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

  const handleSubmit = async (answer) => {
    setModalVisible(true);

    const userId = await AsyncStorage.getItem("id");

    if (answer === "no") {
      return setModalVisible(false);
    }

    if (answer === "sure") {
      setModalVisible(false);

      booking({
        variables: {
          booking: {
            bookingDate: date,
            SlotId: slotRes[0]._id,
            UserId: +userId,
          },
        },
      })
        .then(() => {
          refetch();
          venueRefetch();
          navigation.navigate("Orders");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  if (loading || userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (bookingLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ededed",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: 24,
            marginBottom: 20,
          }}
        >
          Processing your booking
        </Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

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
            <TouchableOpacity onPress={onPressDate}>
              <Text style={styles.input}>{textDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Time <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TouchableOpacity onPress={onPressTime}>
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
              source={
                venueLoading
                  ? require("../assets/parking-img.jpg")
                  : { uri: venueData?.getVenueById.imgVenue }
              }
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
                {venueLoading ? "Venue" : venueData?.getVenueById.name}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "300", color: "#6B728E" }}
              >
                {venueLoading ? "Address" : venueData?.getVenueById.address}
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
                {formatter.format(venueData?.getVenueById.bookingPrice)}
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
            {formatter.format(venueData?.getVenueById.bookingPrice)}
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
        {userData?.getUserById.balance <
        venueData?.getVenueById.bookingPrice ? (
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
        ) : null}

        {textDate === "Date" || textTime === "Time" || name === "Area" ? (
          <View
            style={{
              backgroundColor: "#282C3D",
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#ededed", fontWeight: "400", fontSize: 14 }}>
              Please fill out the form above{" "}
              <Text style={{ color: "red" }}>*</Text>
            </Text>
          </View>
        ) : null}

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor:
                userData?.getUserById.balance <
                  venueData?.getVenueById.bookingPrice ||
                textDate === "Date" ||
                textTime === "Time" ||
                name === "Area"
                  ? "#dedede"
                  : "#404258",
              paddingVertical: 13,
              paddingHorizontal: 10,
              borderRadius: 40,
            }}
            onPress={handleSubmit}
            disabled={
              userData?.getUserById.balance <
                venueData?.getVenueById.bookingPrice ||
              textDate === "Date" ||
              textTime === "Time" ||
              name === "Area"
                ? true
                : false
            }
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
