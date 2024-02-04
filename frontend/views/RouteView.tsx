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
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../Colors";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { Searchbar, TextInput } from "react-native-paper";
import RouteOption from "../components/RouteOption";
import { Animated } from "react-native";
import axios from "axios";
import { dummy } from "../Dummydata";

const safeRadius = 1;

const mapStyle = [
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
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
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
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

const GOOGLE_PACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

export default function RouteView() {
  const [location, setLocation] = useState(
    null as { latitude: number; longitude: number } | null
  );
  const [locationSetup, setLocationSetup] = useState(false);
  const [heading, setHeading] = useState(0);
  const [progress, setProgress] = useState(0);

  const [coordinates, setCoordinates] = useState(
    [] as { latitude: number; longitude: number }[]
  );

  const [instruction, setInstruction] = useState(0);

  const [map, setMap] = useState(null as MapView | null);

  const [from, setFrom] = useState(
    null as { latitude: number; longitude: number } | null
  );
  const [to, setTo] = useState(
    null as { latitude: number; longitude: number } | null
  );

  const [wasFrom, setWasFrom] = useState(false);

  const minArea = 0.003;

  const top = useMemo(() => {
    return (
      Math.max(
        location?.latitude ?? 0,
        ...(from ? [from.latitude] : []),
        ...(to ? [to.latitude] : []),
        ...coordinates.map((coord) => coord.latitude)
      ) + minArea
    );
  }, [coordinates, from, to, locationSetup]);

  const bottom = useMemo(() => {
    return (
      Math.min(
        location?.latitude ?? 0,
        ...(from ? [from.latitude] : []),
        ...(to ? [to.latitude] : []),
        ...coordinates.map((coord) => coord.latitude)
      ) - minArea
    );
  }, [coordinates, from, to, locationSetup]);

  const left = useMemo(() => {
    return (
      Math.min(
        location?.longitude ?? 0,
        ...(from ? [from.longitude] : []),
        ...(to ? [to.longitude] : []),
        ...coordinates.map((coord) => coord.longitude)
      ) - minArea
    );
  }, [coordinates, from, to, locationSetup]);

  const right = useMemo(() => {
    return (
      Math.max(
        location?.longitude ?? 0,
        ...(from ? [from.longitude] : []),
        ...(to ? [to.longitude] : []),
        ...coordinates.map((coord) => coord.longitude)
      ) + minArea
    );
  }, [coordinates, from, to, locationSetup]);

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

  useMemo(() => {
    map?.animateToRegion({
      latitude: midY,
      longitude: midX,
      latitudeDelta: height * 1.5,
      longitudeDelta: width * 1.5,
    });
  }, [midX, midY, width, height]);

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

    if (p !== null) {
      setProgress(p);
      for (
        let i = 0;
        i < data.data.paths[selectedOption].instructions.length;
        i++
      ) {
        if (
          data.data.paths[selectedOption].instructions[i].interval[0] >= p &&
          data.data.paths[selectedOption].instructions[i].interval[1] < p
        ) {
          setInstruction(i);
          break;
        }
      }
    }
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
          if (!locationSetup) {
            setLocationSetup(true);
          }

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
  const [uiState, setUiState] = useState<
    "destination" | "safety" | "navigation"
  >("destination");

  const [selectedOption, setSelectedOption] = useState(0);

  const [fromText, setFromText] = useState("");
  const [fromTextSelected, setFromTextSelected] = useState(false);
  const [toText, setToText] = useState("");
  const [toTextSelected, setToTextSelected] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("post req")
    console.log(JSON.stringify({
      from: [from?.longitude, from?.latitude],
      to: [to?.longitude, to?.latitude]
    }))
    axios.get(`http://146.169.139.107:5001/api/get/?fromLong=${from?.longitude}&fromLat=${from?.latitude}&toLong=${to?.longitude}&toLat=${to?.latitude}`
    ).then((d) => console.log(d)
    ).catch(d => console.log(d))
  }, [from, to])

  const [routes, setRoutes] = useState(
    [] as {
      score: number;
      walkingTime: number;
      arrival: string;
      points: { latitude: number; longitude: number }[];
    }[]
  );

  const selectOption = (number: number) => {
    setSelectedOption(number);
  };

  const confirmDestination = () => {
    const coords = data.data.paths[selectedOption].points.coordinates.map(
      (x) => {
        return { latitude: x[1], longitude: x[0] };
      }
    );

    setCoordinates(coords);
    if (location) updateProgress(coords, location);
    setUiState("navigation");
  };

  const [predictions, setPredictions] = useState<
    {
      description: string;
      place_id: string;
      reference: string;
      matched_substrings: any[];
      tructured_formatting: Object;
      terms: Object[];
      types: string[];
    }[]
  >([]);

  const onChangeText = async (text: string) => {
    if (text.trim() === "") return;
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=AIzaSyCWSTzuX68Fyez5LAEWECiV6f1DnawsY8I&input=${text}`
      + `&location=${location?.latitude},${location?.longitude}&radius=10000`;
    try {
      const result = text === '' ? {data: []} : await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=AIzaSyCWSTzuX68Fyez5LAEWECiV6f1DnawsY8I&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        setPredictions([]);
        if (wasFrom) {
          setFrom({ latitude: lat, longitude: lng });
          setFromText(description);
        } else {
          setTo({ latitude: lat, longitude: lng });
          setToText(description);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadRoutes = async () => {
    // TODO: get from server

    setRoutes(
      data.data.paths.map((x) => {
        const arrivalTime = new Date(Date.now() + x.time);
        const minuteStr =
          arrivalTime.getMinutes() < 10
            ? `0${arrivalTime.getMinutes()}`
            : arrivalTime.getMinutes();
        return {
          score: Math.round(x.safety_score * 10),
          walkingTime: x.time / 60000,
          arrival: `${arrivalTime.getHours()}:${minuteStr}`,
          points: x.points.coordinates.map((x: any) => {
            return {
              latitude: x[1],
              longitude: x[0],
            };
          }),
        };
      })
    );
    setUiState("safety");
  };

  return (
    <View style={styles.view}>
      <MapView
        ref={(m) => {
          setMap(m);
        }}
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
          coordinates={
            from
              ? [from, ...coordinates.slice(0, progress + 1)]
              : coordinates.slice(0, progress + 1)
          }
          strokeColor={colors.routePassed}
          strokeWidth={6}
        ></Polyline>
        <Polyline
          coordinates={
            to
              ? [...coordinates.slice(progress), to]
              : coordinates.slice(progress)
          }
          strokeColor={colors.route}
          strokeWidth={6}
        ></Polyline>
        {to ? (
          <Marker coordinate={to} anchor={{ x: 0.5, y: 0.5 }}>
            <View
              style={[
                {
                  backgroundColor: colors.route,
                },
                styles.marker,
              ]}
            ></View>
          </Marker>
        ) : null}

        {from ? (
          <Marker coordinate={from}>
            <View
              style={[
                {
                  backgroundColor: colors.routePassed,
                },
                styles.marker,
              ]}
            ></View>
          </Marker>
        ) : null}
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
      {/* <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            zIndex: 100,
            position: "absolute",
            top: 100,
          },
        }}
        placeholder="Search"
        query={{
          key: "AIzaSyCWSTzuX68Fyez5LAEWECiV6f1DnawsY8I",
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
      /> */}

      <View
        style={{
          zIndex: 100,
          position: "absolute",
          top: 10,
          left: 0,
          right: 0,
          margin: 20,
        }}
      >
        {uiState !== "destination" && uiState !== "safety" ? (
          ""
        ) : (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View
              style={[
                styles.searchfield,
                {
                  borderBottomColor: "#e0e0e0",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Image
                source={require("../assets/left.png")}
                style={{
                  width: 15,
                  height: 15,
                }}
              />
              <TextInput
                caretHidden={false}
                numberOfLines={1}
                multiline={false}
                value={fromText}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                placeholder="From"
                placeholderTextColor={"#a0a0a0"}
                cursorColor="#404040"
                onChangeText={(text) => {
                  setFromText(text);
                  setWasFrom(true);
                  onChangeText(text);
                }}
                style={{
                  fontFamily: "body",
                  flex: 1,
                  height: 50,
                  backgroundColor: "transparent",
                  textAlign: "auto",
                }}
              ></TextInput>
            </View>
            <View style={styles.searchfield}>
              <Image
                source={require("../assets/right.png")}
                style={{
                  width: 15,
                  height: 15,
                }}
              />
              <TextInput
                caretHidden={false}
                numberOfLines={1}
                multiline={false}
                value={toText}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                placeholder="To"
                placeholderTextColor={"#a0a0a0"}
                cursorColor="#404040"
                onChangeText={(text) => {
                  setToText(text);
                  setWasFrom(false);
                  onChangeText(text);
                }}
                style={{
                  fontFamily: "body",
                  flex: 1,
                  height: 50,
                  backgroundColor: "transparent",
                  textAlign: "auto",
                }}
              ></TextInput>
            </View>
          </View>
        )}
        <ScrollView
          style={{
            marginTop: 20,
            backgroundColor: "white",
            borderRadius: 10,
            maxHeight: 250,
          }}
        >
          {predictions.map((prediction, index) => {
            return (
              <TouchableOpacity
                onPress={(e) => {
                  onPredictionTapped(
                    prediction.place_id,
                    prediction.description
                  );
                  let _fromTextSelected = false;
                  let _toTextSelected = false;
                  if (wasFrom) {
                    _fromTextSelected = true;
                    setFromTextSelected(true);
                  } else {
                    _toTextSelected = true;
                    setToTextSelected(true);
                  }
                  if (
                    (fromTextSelected || _fromTextSelected) &&
                    (toTextSelected || _toTextSelected)
                  ) {
                    loadRoutes();
                  }
                }}
                key={index}
              >
                <View
                  style={{
                    padding: 15,
                    borderBottomColor: "#e0e0e0",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#404040",
                      flex: 1,
                    }}
                  >
                    {prediction.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {uiState !== "safety" ? (
        ""
      ) : (
        <View>
          <View style={styles.routes}>
            {routes.map((route, index) => {
              return (
                <RouteOption
                  key={index}
                  score={route.score}
                  walkingTime={route.walkingTime}
                  arrival={route.arrival}
                  index={index}
                  selected={selectedOption === index}
                  selectOption={selectOption}
                  safest={index === 0}
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
        </View>
      )}
      {uiState !== "navigation" ? (
        ""
      ) : (
        <>
          <View
            style={{
              backgroundColor: "#2245FF",
              position: "absolute",
              top: 40,
              left: 20,
              right: 20,
              height: 90,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            {(() => {
              switch (
                data.data.paths[selectedOption].instructions[instruction].sign
              ) {
                case -2:
                  return (
                    <Image
                      source={require("../assets/turnleft.png")}
                      style={{
                        width: 36,
                        height: 44,
                        marginRight: 19,
                        marginLeft: 10,
                      }}
                    ></Image>
                  );
                  break;
                case 2:
                  return (
                    <Image
                      source={require("../assets/turnright.png")}
                      style={{
                        width: 36,
                        height: 44,
                        marginRight: 19,
                        marginLeft: 10,
                      }}
                    ></Image>
                  );
                  break;
                case 0:
                  return (
                    <Image
                      source={require("../assets/straight.png")}
                      style={{
                        width: 25,
                        height: 40,
                        marginRight: 30,
                        marginLeft: 10,
                      }}
                    ></Image>
                  );
                  break;

                default:
                  return null;
                  break;
              }
            })()}

            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "body",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {data.data.paths[selectedOption].instructions[instruction].text}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 30,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "body",
                  color: "black",
                  fontSize: 22,
                  marginBottom: 5,
                }}
              >
                {Math.round(
                  getRestTime(
                    instruction,
                    data.data.paths[selectedOption].instructions
                  ) / 60000
                )}
                min
              </Text>
              <Text
                style={{
                  fontFamily: "body",
                  color: "#a0a0a0",
                  fontSize: 14,
                }}
              >
                {Math.round(
                  getRestDistance(
                    instruction,
                    data.data.paths[selectedOption].instructions
                  ) *
                    0.000621371 *
                    10
                ) / 10}
                mi - Arriving{" "}
                {(() => {
                  const arrivalTime = new Date(
                    Date.now() +
                      getRestTime(
                        instruction,
                        data.data.paths[selectedOption].instructions
                      )
                  );
                  const minuteStr =
                    arrivalTime.getMinutes() < 10
                      ? `0${arrivalTime.getMinutes()}`
                      : arrivalTime.getMinutes();
                  return `${arrivalTime.getHours()}:${minuteStr}`;
                })()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setUiState("safety");
              }}
            >
              <View
                style={{
                  backgroundColor: "#FF2538",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "body",
                    color: "white",
                    fontSize: 14,
                    paddingHorizontal: 25,
                    paddingVertical: 13,
                  }}
                >
                  Exit Route
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* <Modal>
        <View>
          <Text>Test</Text>
        </View>
      </Modal> */}
    </View>
  );
}

function getRestDistance(
  instruction: number,
  instructions: {
    distance: number;
  }[]
) {
  let sum = 0;
  for (let i = instruction; i < instructions.length; i++) {
    sum += instructions[i].distance;
  }
  return sum;
}

function getRestTime(
  instruction: number,
  instructions: {
    time: number;
  }[]
) {
  let sum = 0;
  for (let i = instruction; i < instructions.length; i++) {
    sum += instructions[i].time;
  }
  return sum;
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
  searchfield: {
    flexDirection: "row",
    alignItems: "center",
  },
});
