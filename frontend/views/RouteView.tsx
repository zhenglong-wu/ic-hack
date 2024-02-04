import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from "../Colors";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { Searchbar } from "react-native-paper";
import RouteOption from "../components/RouteOption";
import { Animated } from "react-native";

const safeRadius = 1;

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const GEOLOCATION_OPTIONS: Location.LocationOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  timeInterval: 1000,
  distanceInterval: 1,
  mayShowUserSettingsDialog: true,
};

export default function RouteView(props: {
  routes: {
    score: number;
    walkingTime: number;
    arrival: string;
    points: { latitude: number; longitude: number }[];
  }[];
}) {
  const [location, setLocation] = useState(
    null as { latitude: number; longitude: number } | null
  );
  const [heading, setHeading] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  const [coordinates, setCoordinates] = useState(
    [] as { latitude: number; longitude: number }[]
  );

  const top = useMemo(() => {
    return Math.max(
      location?.latitude ?? 0,
      ...coordinates.map((coord) => coord.latitude)
    );
  }, [coordinates]);

  const bottom = useMemo(() => {
    return Math.min(
      location?.latitude ?? 0,
      ...coordinates.map((coord) => coord.latitude)
    );
  }, [coordinates]);

  const left = useMemo(() => {
    return Math.min(
      location?.longitude ?? 0,
      ...coordinates.map((coord) => coord.longitude)
    );
  }, [coordinates]);

  const right = useMemo(() => {
    return Math.max(
      location?.longitude ?? 0,
      ...coordinates.map((coord) => coord.longitude)
    );
  }, [coordinates]);

  const midX = useMemo(() => {
    return (left + right) / 2;
  }, [left, right]);

  const midY = useMemo(() => {
    return (top + bottom) / 2;
  }, [top, bottom]);

  const width = useMemo(() => {
    return right - left;
  }, [left, right]);

  const height = useMemo(() => {
    return top - bottom;
  }, [top, bottom]);

  const updateProgress = (
    coordinates: {
      longitude: number;
      latitude: number;
    }[],
    location: {
      longitude: number;
      latitude: number;
    }
  ) => {
    let p = null;
    let min = Infinity;
    for (let i = 0; i < coordinates.length; i++) {
      let dx = location.latitude - coordinates[i].latitude;
      let dy = location.longitude - coordinates[i].longitude;
      let dist = dx * dx + dy * dy;
      if (dist < min) {
        p = i;
        min = dist;
      }
    }

    if (p !== null) setProgress(p);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      try {
        await Location.watchPositionAsync(GEOLOCATION_OPTIONS, (location) => {
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          updateProgress(coordinates, {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        });

        await Location.watchHeadingAsync((heading) => {
          setHeading(heading.trueHeading);
        });
      } catch (error) {
        console.error("Error watching position: ", error);
      }
    })();
  }, [coordinates]);

  const [searchbarText, setSearchBarText] = useState("");

  const [selectedOption, setSelectedOption] = useState(0);

  const selectOption = (number: number) => {
    setSelectedOption(number);
  };

  const confirmDestination = () => {
    // TODO: Update coordinates from server
    setCoordinates(props.routes[selectedOption].points);
    if (location) updateProgress(props.routes[selectedOption].points, location);
    setModalVisible(false);
  };

  return (
    <View style={styles.view}>
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            zIndex: 100,
            position: 'absolute',
            top: 100
          }
        }}
        placeholder="Search"
        query={{
          key: 'AIzaSyCWSTzuX68Fyez5LAEWECiV6f1DnawsY8I',
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: midY,
          longitude: midX,
          latitudeDelta: height * 1.5,
          longitudeDelta: width * 1.5,
        }}
      >
        <Polyline
          coordinates={coordinates.slice(0, progress + 1)}
          strokeColor={colors.routePassed}
          strokeWidth={6}
        ></Polyline>
        <Polyline
          coordinates={coordinates.slice(progress)}
          strokeColor={colors.route}
          strokeWidth={6}
        ></Polyline>
        <Marker
          coordinate={coordinates[coordinates.length - 1]}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View
            style={[
              {
                backgroundColor: colors.route,
              },
              styles.marker,
            ]}
          ></View>
        </Marker>

        <Marker coordinate={coordinates[0]} anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={[
              {
                backgroundColor: colors.routePassed,
              },
              styles.marker,
            ]}
          ></View>
        </Marker>
        {location ? (
          <>
            <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.currentBg}></View>

              <Image
                source={require("../assets/navigation.png")}
                style={[
                  {
                    transform: [{ rotate: `${heading - 45}deg` }],
                  },
                  styles.currentFg,
                ]}
              />
            </Marker>
          </>
        ) : null}
      </MapView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.routes}>
          {props.routes.map((route, index) => {
            return (
              <RouteOption
                key={index}
                score={route.score}
                walkingTime={route.walkingTime}
                arrival={route.arrival}
                index={index}
                selected={selectedOption === index}
                selectOption={selectOption}
              />
            );
          })}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmDestination}
          >
            <Text style={styles.confirmButtonText}>Confirm Destination</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    padding: 8,
    borderRadius: 8,
  },
  currentBg: {
    backgroundColor: colors.route,
    padding: 12,
    borderRadius: 12,
    position: "absolute",
  },
  currentFg: {
    width: 24,
    height: 24,
    position: "absolute",
  },
  routes: {
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
  },
  confirmButton: {
    marginTop: 15,
    backgroundColor: colors.buttonBg,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontFamily: "body",
  },
});
