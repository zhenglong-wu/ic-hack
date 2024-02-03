import MapView, { Circle, Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { StyleSheet, View, Text, Image, Alert, Button, Pressable, TouchableOpacity } from "react-native";
import { colors } from "../Colors";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

const coordinates = [
  [51.4990374, -0.1744124],
  [51.49862, -0.17432],
  [51.4985, -0.1743],
  [51.49823, -0.17424],
  [51.49814, -0.17424],
  [51.4981403, -0.1742426],
  [51.49809, -0.17491],
  [51.49808, -0.17507],
  [51.49807, -0.17516],
  [51.49805, -0.17544],
  [51.49804, -0.17555],
  [51.49803, -0.17568],
  [51.49797, -0.17646],
  [51.49791, -0.17716],
  [51.49787, -0.17774],
  [51.49786, -0.17792],
  [51.49783, -0.17821],
  [51.49781, -0.17851],
  [51.49785, -0.17861],
  [51.49779, -0.17873],
  [51.49777, -0.17896],
  [51.49775, -0.17925],
  [51.49774, -0.17931],
  [51.4977411, -0.1793147],
  [51.49772, -0.17931],
  [51.49711, -0.17918],
  [51.49703, -0.17917],
  [51.49689, -0.17913],
  [51.49683, -0.17911],
  [51.4968, -0.17911],
  [51.49667, -0.17908],
  [51.49657, -0.17906],
  [51.49627, -0.17899],
  [51.49619, -0.17898],
  [51.49594, -0.17893],
  [51.49585, -0.17893],
  [51.49566, -0.17886],
  [51.49564, -0.17886],
  [51.49554, -0.17884],
  [51.49547, -0.17883],
  [51.49545, -0.17882],
  [51.49546, -0.17864],
  [51.49544, -0.17863],
  [51.49537, -0.17862],
  [51.49536, -0.17881],
  [51.49533, -0.17881],
  [51.49533, -0.17876],
  [51.49527, -0.17874],
  [51.49525, -0.17874],
  [51.49525, -0.17879],
  [51.49519, -0.17878],
  [51.49511, -0.17876],
  [51.49469, -0.17868],
  [51.49436, -0.1786],
  [51.49429, -0.17859],
  [51.49424, -0.17858],
  [51.49409, -0.17855],
  [51.49401, -0.17854],
  [51.49394, -0.17852],
  [51.49394, -0.17848],
  [51.49392, -0.17847],
  [51.49381, -0.17844],
  [51.49379, -0.17844],
  [51.49378, -0.17849],
  [51.49376, -0.17848],
  [51.493762, -0.1784813],
  [51.49373, -0.17881],
  [51.49374, -0.17881],
  [51.49373, -0.17893],
  [51.49371, -0.17905],
  [51.49369, -0.17917],
  [51.49368, -0.17923],
  [51.49367, -0.17945],
  [51.49365, -0.17961],
  [51.49364, -0.17969],
  [51.49362, -0.17992],
  [51.49361, -0.18002],
  [51.49359, -0.18012],
  [51.49357, -0.18028],
  [51.49354, -0.18042],
  [51.4935, -0.18075],
  [51.49345, -0.18092],
  [51.49341, -0.18112],
  [51.4934, -0.1812],
  [51.49338, -0.18133],
  [51.49336, -0.18144],
  [51.49336, -0.18147],
  [51.49334, -0.18158],
  [51.49332, -0.18173],
  [51.49332, -0.18174],
  [51.49332, -0.18176],
  [51.4933205, -0.1817638],
  [51.4933, -0.1819],
  [51.4933, -0.18193],
  [51.49329, -0.182],
  [51.49331, -0.18201],
  [51.49341, -0.18205],
  [51.49344, -0.18206],
  [51.49343, -0.18211],
  [51.49342, -0.18221],
  [51.4934, -0.18227],
  [51.4934, -0.18232],
  [51.49333, -0.18274],
  [51.49329, -0.18302],
  [51.49328, -0.1831],
  [51.49327, -0.18316],
  [51.49324, -0.18334],
  [51.4932405, -0.183337],
].map((x) => {
  return {
    latitude: x[0],
    longitude: x[1],
  };
});

const safeRadius = 1;

const right = Math.max(...coordinates.map((coord) => coord.longitude));
const left = Math.min(...coordinates.map((coord) => coord.longitude));
const width = right - left;
const midX = (right + left) / 2;

const top = Math.max(...coordinates.map((coord) => coord.latitude));
const bottom = Math.min(...coordinates.map((coord) => coord.latitude));
const height = top - bottom;
const midY = (top + bottom) / 2;

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

export default function RouteView() {
  const [location, setLocation] = useState(
    null as { latitude: number; longitude: number } | null
  );
  const [heading, setHeading] = useState(0);
  const [progress, setProgress] = useState(0);

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

          let p = 0;
          let min = Infinity;
          for (let i = 0; i < coordinates.length; i++) {
            let dx = location.coords.latitude - coordinates[i].latitude;
            let dy = location.coords.longitude - coordinates[i].longitude;
            let dist = dx * dx + dy * dy;
            if (dist < min) {
              p = i;
              min = dist;
            }
          }

          setProgress(p);
        });

        await Location.watchHeadingAsync((heading) => {
          setHeading(heading.trueHeading);
        });
      } catch (error) {
        console.error("Error watching position: ", error);
      }
    })();
  }, []);

  const [searchbarText, setSearchBarText] = useState("")

  return (
    <View style={styles.view}>
      <Searchbar style={{ position: 'absolute', top: 50, zIndex: 23,
                }} placeholder="Search" value={searchbarText} onChangeText={setSearchBarText} />
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
            style={{
              backgroundColor: colors.route,
              padding: 8,
              borderRadius: 8,
            }}
          ></View>
        </Marker>

        <Marker coordinate={coordinates[0]} anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={{
              backgroundColor: colors.routePassed,
              padding: 8,
              borderRadius: 8,
            }}
          ></View>
        </Marker>
        {location ? (
          <>
            <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
              <View
                style={{
                  backgroundColor: colors.route,
                  padding: 12,
                  borderRadius: 12,
                  position: "absolute",
                }}
              ></View>

              <Image
                source={require("../assets/navigation.png")}
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  transform: [{ rotate: `${heading - 45}deg` }],
                }}
              />
            </Marker>
          </>
        ) : null}
      </MapView>
      <View style={{padding: 15}}>
        <Text style={{fontSize: 20, marginBottom: 5 }}>
          <Text style={{color: 'green'}}>95%</Text> safety score
        </Text>
        <Text style={{marginBottom: 10}}>25 min | 1.2 mi | Mostly flat</Text>
        <Button title="Start" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  map: {
    width: "100%",
    height: "85%",
  },
});
