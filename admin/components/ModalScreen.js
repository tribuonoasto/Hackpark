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
import axios from "axios";
import { useState } from "react";
import { CHECK_BOOKING, GET_BOOKINGS_BY_ID } from "../queries/bookings";
import { useLazyQuery, useMutation } from "@apollo/client";

const ModalScreen = ({
  modalVisible,
  setModalVisible,
  setScanned,
  data,
  setResult,
}) => {
  const [bookings, { loading, error, data: bookingData }] =
    useLazyQuery(GET_BOOKINGS_BY_ID);
  const [
    checkBookings,
    { loading: checkLoading, error: checkError, data: checkData },
  ] = useMutation(CHECK_BOOKING);

  const handleSubmitButton = () => {
    checkBookings({
      variables: {
        bookingId: {
          bookingId: data._id,
          UserId: +data.User.id,
        },
      },
    })
      .then((response) => {
        console.log(response);
        setModalVisible(false);
        setScanned(false);
        setResult(response.data.checkBooking.message);
      })
      .catch((err) => {
        setModalVisible(false);
        setScanned(false);
        setResult("Can't proceed");
      });

    bookings({
      variables: {
        id: data._id,
      },
    });
  };

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
          onPress={() => {
            setModalVisible(false);
            setScanned(false);
          }}
        >
          <Entypo name="cross" size={25} color="black" style={{ padding: 1 }} />
        </TouchableOpacity>

        <View
          style={{ paddingTop: Constans.statusBarHeight + 100, padding: 20 }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: data?.Venue.imgVenue }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
            <Text
              style={{ marginVertical: 20, fontWeight: "600", fontSize: 18 }}
            >
              {data?.Venue.name}, {data?.Venue.address}
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
            }}
          >
            {/* <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 10 }}>
              Username: {data.User.username}
            </Text> */}
            <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 10 }}>
              Booking ID: {data?._id}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Booking date
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {data?.bookingDate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Floor</Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {data?.Slot.floor}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Slot</Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {data?.Slot.name}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "darkgreen",
              paddingVertical: 15,
              marginTop: 50,
              borderRadius: 40,
            }}
            onPress={handleSubmitButton}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
    paddingTop: Constans.statusBarHeight + 10,
  },
});
