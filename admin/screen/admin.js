import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import ModalScreen from "../components/ModalScreen";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_BOOKINGS_BY_ID } from "../queries/bookings";

const Admin = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [result, setResult] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [bookings, { loading, error, data }] = useLazyQuery(GET_BOOKINGS_BY_ID);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    bookings({
      variables: {
        id: data,
      },
    });
    setModalVisible(true);
    setShowScan(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!modalVisible && !showScan && result && (
        <View
          style={{
            position: "absolute",
            top: 180,
            justifyContent: "center",
            backgroundColor: "#425F57",
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>{result}</Text>
        </View>
      )}

      {!showScan && !modalVisible && (
        <TouchableOpacity
          onPress={() => setShowScan(true)}
          style={{
            backgroundColor: "#379237",
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 40,
          }}
        >
          <Text style={{ color: "#ededed" }}>Scan barcode</Text>
        </TouchableOpacity>
      )}

      {showScan && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeCamera}
        />
      )}

      {modalVisible && (
        <ModalScreen
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setScanned={setScanned}
          data={data?.getBookingById}
          setResult={setResult}
        />
      )}

      {showScan && (
        <TouchableOpacity
          style={{
            backgroundColor: "#B73E3E",
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 40,
          }}
          onPress={() => {
            setShowScan(false);
            setScanned(false);
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              color: "#ededed",
              textAlign: "center",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
  },
  barCodeCamera: {
    width: 300,
    height: 300,
  },
  button: {
    backgroundColor: "#379237",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
});
