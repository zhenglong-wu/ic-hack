import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

const coordinates = [
  [51.49319145172372, -0.22368978734908018],
  [51.492550082908494, -0.22962691956756057],
].map((x) => {
  return {
    latitude: x[0],
    longitude: x[1],
  };
});

export default function RouteView() {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Your Route</Text>
      <View style={styles.mapParent}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.4919797,
            longitude: -0.224023,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Polyline coordinates={coordinates}></Polyline>
          {coordinates.map((coordinate, index) => {
            return (
              <Marker key={`coordinate_${index}`} coordinate={coordinate} />
            );
          })}
        </MapView>
      </View>
    </View>
  );
}

const margin = 10;

const styles = StyleSheet.create({
  view: {
    paddingVertical: 60 - 2 * margin,
    paddingHorizontal: 40,
    flexDirection: "column",
    height: "100%",
  },
  title: {
    fontFamily: "heading",
    fontSize: 28,
    marginVertical: margin,
    marginHorizontal: 10,
  },
  mapParent: {
    marginVertical: margin,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    flex: 1,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "black",
  },
  map: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
});
