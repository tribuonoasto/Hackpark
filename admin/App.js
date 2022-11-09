import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScan, setShowScan] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(type, data);
    const { data: res } = await axios({
      method: "post",
      url: `https://175f-94-198-43-62.ap.ngrok.io/bookings/check/${data}`,
    });

    console.log(res);
    // console.log(type, data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!showScan && (
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

      {scanned && showScan ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              color: "#ededed",
              textAlign: "center",
            }}
          >
            Tap to scan again
          </Text>
        </TouchableOpacity>
      ) : null}

      {showScan && (
        <TouchableOpacity
          style={{
            backgroundColor: "#B73E3E",
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 40,
          }}
          onPress={() => setShowScan(false)}
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
}
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
