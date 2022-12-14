import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import Search from "../components/Search";
import Card from "../components/Card";
import Constants from "expo-constants";
import { Feather, FontAwesome5 } from "react-native-vector-icons";
import { getBoundsOfDistance, getDistance } from "geolib";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_VENUES, GET_VENUES_BY_ID } from "../queries/bookings";

const SearchScreen = ({ navigation }) => {
  const [pin, setPin] = useState({
    latitude: -6.2,
    longitude: 106.816666,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filteredVenues, seFilteredVenues] = useState([]);
  const [clickedPin, setClickedPin] = useState(false);

  const map = useRef();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  function fitMap() {
    const coordinates = pin;
    setClickedPin(false);

    const radiusBoundaries = getBoundsOfDistance(coordinates, 700);

    map.current.fitToCoordinates(radiusBoundaries, {
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    });
  }

  const { loading, error, data } = useQuery(GET_VENUES);

  useEffect(() => {
    if (searchPhrase) {
      const tempVenues = data?.getVenues.filter((venue) => {
        return venue.name.toLowerCase().includes(searchPhrase.toLowerCase());
      });

      seFilteredVenues(tempVenues);
    }
  }, [searchPhrase]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const [
    getVenueId,
    { loading: venueLoading, error: venueError, data: venueData },
  ] = useLazyQuery(GET_VENUES_BY_ID);

  const handleVenue = (id, coordinates) => {
    const radiusBoundaries = getBoundsOfDistance(coordinates, 700);

    map.current.fitToCoordinates(radiusBoundaries, {
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    });

    setClickedPin(true);

    getVenueId({
      variables: {
        getVenueByIdId: id,
      },
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/shape-animation.gif")}
          style={{ width: 150, height: 150, resizeMode: "cover" }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
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
        ref={map}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: pin.latitude,
            longitude: pin.longitude,
          }}
          title="You're here"
          description="This is your location"
          draggable={true}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        ></Marker>

        {data?.getVenues.map((venue, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: +venue.lat,
                longitude: +venue.lng,
              }}
              onPress={() =>
                handleVenue(venue._id, {
                  latitude: +venue.lat,
                  longitude: +venue.lng,
                })
              }
              image={require("../assets/pin-icon.png")}
            >
              <Callout>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: venue.imgVenue }}
                    style={{ width: 30, height: 30, resizeMode: "cover" }}
                  />

                  <Text
                    style={{ fontSize: 10, fontWeight: "300", marginLeft: 5 }}
                  >
                    {venue.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={fitMap}>
        <FontAwesome5 name="map-marked-alt" color="#fff" size={24} />
      </TouchableOpacity>

      {clickedPin && (
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            padding: 20,
            flex: 1,
            height: 200,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => setClickedPin(false)}
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <Feather name="x" color="#A1A9CC" size={24} />
            </TouchableOpacity>
            <View style={{ marginTop: 30, flexDirection: "row" }}>
              <Image
                source={{ uri: venueData?.getVenueById.imgVenue }}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "cover",
                  borderRadius: 100,
                }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#404258" }}
                >
                  {venueData?.getVenueById.name}
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "400", color: "#50577A" }}
                >
                  {venueData?.getVenueById.address}
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    width: 200,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color: "#50577A",
                      }}
                    >
                      Booking price:{" "}
                      {formatter.format(venueData?.getVenueById.bookingPrice)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color: "#50577A",
                      }}
                    >
                      Parking price:{" "}
                      {formatter.format(venueData?.getVenueById.parkingPrice)}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "lightgreen",
                      borderRadius: 5,
                      alignItems: "center",
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "darkgreen",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      Available{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#404258",
                paddingVertical: 12,
                borderRadius: 40,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("BookScreen", {
                  id: venueData?.getVenueById._id,
                })
              }
            >
              <Text
                style={{ color: "#EDEDED", fontSize: 12, fontWeight: "600" }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {clicked && (
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            padding: 20,
            paddingTop: Constants.statusBarHeight + 100,
            flex: 1,
          }}
        >
          <View>
            {searchPhrase ? (
              <FlatList
                data={filteredVenues}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card
                    item={item}
                    navigation={navigation}
                    keyExtractor={(item) => item.id}
                  />
                )}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 18, color: "#404258" }}
                >
                  Find the best spot for you
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
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
  button: {
    position: "absolute",
    top: 150,
    right: 20,
    backgroundColor: "#404258",
    padding: 10,
    borderRadius: 100,
  },
  buttonStyle: {
    position: "absolute",
    top: 150,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#dddddd",
    margin: 10,
  },
});
