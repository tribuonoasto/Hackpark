import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

const SearchScreen = () => {
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        style={styles.map}
      >
        <Marker
          coordinate={pin}
          title="You're here"
          description="This is your location"
          draggable={true}
          onDragEnd={(e) => {
            e.nativeEvent.coordinate;
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        ></Marker>
      </MapView>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
