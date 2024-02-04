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

const findPathData = async (from: {
  longitude: number;
  latitude: number;
}, to: {
  longitude: number;
  latitude: number;
}) => {
  return {
    "code": 200,
    "data": {
        "hints": {
            "visited_nodes.sum": 630,
            "visited_nodes.average": 630.0
        },
        "info": {
            "copyrights": [
                "GraphHopper",
                "OpenStreetMap contributors"
            ],
            "took": 6,
            "road_data_timestamp": "2024-02-02T22:00:00Z"
        },
        "paths": [
            {
                "distance": 1196.905,
                "weight": 767.173364,
                "time": 858549,
                "transfers": 0,
                "points_encoded": false,
                "bbox": [
                    -0.132246,
                    51.511304,
                    -0.120417,
                    51.515255
                ],
                "points": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.132153,
                            51.51523
                        ],
                        [
                            -0.131905,
                            51.514925
                        ],
                        [
                            -0.131517,
                            51.515026
                        ],
                        [
                            -0.131245,
                            51.514594
                        ],
                        [
                            -0.13047,
                            51.51348
                        ],
                        [
                            -0.130282,
                            51.513568
                        ],
                        [
                            -0.130227,
                            51.513526
                        ],
                        [
                            -0.130153,
                            51.513512
                        ],
                        [
                            -0.129437,
                            51.51347
                        ],
                        [
                            -0.129265,
                            51.513505
                        ],
                        [
                            -0.12921,
                            51.513404
                        ],
                        [
                            -0.129135,
                            51.51343
                        ],
                        [
                            -0.129071,
                            51.513403
                        ],
                        [
                            -0.129008,
                            51.513344
                        ],
                        [
                            -0.128801,
                            51.5135
                        ],
                        [
                            -0.128183,
                            51.513564
                        ],
                        [
                            -0.12815,
                            51.51358
                        ],
                        [
                            -0.127099,
                            51.513747
                        ],
                        [
                            -0.127029,
                            51.513704
                        ],
                        [
                            -0.126957,
                            51.513708
                        ],
                        [
                            -0.126909,
                            51.513745
                        ],
                        [
                            -0.125282,
                            51.513937
                        ],
                        [
                            -0.125185,
                            51.514002
                        ],
                        [
                            -0.124075,
                            51.513261
                        ],
                        [
                            -0.124164,
                            51.513207
                        ],
                        [
                            -0.1231,
                            51.512257
                        ],
                        [
                            -0.123144,
                            51.512239
                        ],
                        [
                            -0.122542,
                            51.511716
                        ],
                        [
                            -0.122129,
                            51.511902
                        ],
                        [
                            -0.122028,
                            51.51182
                        ],
                        [
                            -0.121806,
                            51.511918
                        ],
                        [
                            -0.121392,
                            51.511583
                        ],
                        [
                            -0.121182,
                            51.511702
                        ],
                        [
                            -0.121053,
                            51.51164
                        ],
                        [
                            -0.12072,
                            51.511559
                        ],
                        [
                            -0.120644,
                            51.511525
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "instructions": [
                    {
                        "distance": 6.99,
                        "heading": 113.34,
                        "sign": 0,
                        "interval": [
                            0,
                            1
                        ],
                        "text": "Continue",
                        "time": 5033,
                        "street_name": ""
                    },
                    {
                        "distance": 38.019,
                        "sign": 1,
                        "interval": [
                            1,
                            2
                        ],
                        "text": "Turn slight right",
                        "time": 28129,
                        "street_name": ""
                    },
                    {
                        "distance": 29.093,
                        "sign": -2,
                        "interval": [
                            2,
                            3
                        ],
                        "text": "Turn left onto Soho Square",
                        "time": 20947,
                        "street_name": "Soho Square"
                    },
                    {
                        "distance": 186.681,
                        "sign": 2,
                        "interval": [
                            3,
                            5
                        ],
                        "text": "Turn right onto Greek Street",
                        "time": 132954,
                        "street_name": "Greek Street"
                    },
                    {
                        "distance": 16.245,
                        "sign": -3,
                        "interval": [
                            5,
                            6
                        ],
                        "text": "Turn sharp left onto Old Compton Street",
                        "time": 11696,
                        "street_name": "Old Compton Street"
                    },
                    {
                        "distance": 73.616,
                        "sign": 2,
                        "interval": [
                            6,
                            10
                        ],
                        "text": "Turn right onto Moor Street",
                        "time": 53003,
                        "street_name": "Moor Street"
                    },
                    {
                        "street_ref": "A400",
                        "distance": 11.861,
                        "sign": 2,
                        "interval": [
                            10,
                            11
                        ],
                        "text": "Turn right onto Charing Cross Road",
                        "time": 8540,
                        "street_name": "Charing Cross Road"
                    },
                    {
                        "distance": 19.208,
                        "sign": -2,
                        "interval": [
                            11,
                            14
                        ],
                        "text": "Turn left",
                        "time": 13830,
                        "street_name": ""
                    },
                    {
                        "street_ref": "A401",
                        "distance": 22.589,
                        "sign": -3,
                        "interval": [
                            14,
                            15
                        ],
                        "text": "Turn sharp left onto Shaftesbury Avenue",
                        "time": 16264,
                        "street_name": "Shaftesbury Avenue"
                    },
                    {
                        "distance": 121.316,
                        "sign": 7,
                        "interval": [
                            15,
                            18
                        ],
                        "text": "Keep right onto Earlham Street",
                        "time": 87349,
                        "street_name": "Earlham Street"
                    },
                    {
                        "exit_number": 3,
                        "distance": 141.73,
                        "sign": 6,
                        "exited": true,
                        "turn_angle": -3.06,
                        "interval": [
                            18,
                            23
                        ],
                        "text": "At roundabout, take exit 3 onto Earlham Street",
                        "time": 102045,
                        "street_name": "Earlham Street"
                    },
                    {
                        "distance": 112.831,
                        "sign": 3,
                        "interval": [
                            23,
                            24
                        ],
                        "text": "Turn sharp right onto Neal Street",
                        "time": 81241,
                        "street_name": "Neal Street"
                    },
                    {
                        "street_ref": "B402",
                        "distance": 8.552,
                        "sign": 2,
                        "interval": [
                            24,
                            25
                        ],
                        "text": "Turn right onto Long Acre",
                        "time": 6157,
                        "street_name": "Long Acre"
                    },
                    {
                        "distance": 128.809,
                        "sign": -2,
                        "interval": [
                            25,
                            26
                        ],
                        "text": "Turn left onto James Street",
                        "time": 92377,
                        "street_name": "James Street"
                    },
                    {
                        "distance": 3.632,
                        "sign": 2,
                        "interval": [
                            26,
                            27
                        ],
                        "text": "Turn right onto Covent Garden",
                        "time": 2615,
                        "street_name": "Covent Garden"
                    },
                    {
                        "distance": 71.57,
                        "sign": -2,
                        "interval": [
                            27,
                            28
                        ],
                        "text": "Turn left",
                        "time": 49370,
                        "street_name": ""
                    },
                    {
                        "distance": 35.368,
                        "sign": -2,
                        "interval": [
                            28,
                            29
                        ],
                        "text": "Turn left",
                        "time": 25465,
                        "street_name": ""
                    },
                    {
                        "distance": 11.563,
                        "sign": 2,
                        "interval": [
                            29,
                            30
                        ],
                        "text": "Turn right",
                        "time": 8326,
                        "street_name": ""
                    },
                    {
                        "distance": 18.838,
                        "sign": -2,
                        "interval": [
                            30,
                            31
                        ],
                        "text": "Turn left onto Covent Garden",
                        "time": 13564,
                        "street_name": "Covent Garden"
                    },
                    {
                        "distance": 47.061,
                        "sign": 2,
                        "interval": [
                            31,
                            32
                        ],
                        "text": "Turn right onto Tavistock Court",
                        "time": 33885,
                        "street_name": "Tavistock Court"
                    },
                    {
                        "distance": 19.624,
                        "sign": -2,
                        "interval": [
                            32,
                            33
                        ],
                        "text": "Turn left onto Tavistock Street",
                        "time": 14129,
                        "street_name": "Tavistock Street"
                    },
                    {
                        "distance": 71.709,
                        "sign": 2,
                        "interval": [
                            33,
                            37
                        ],
                        "text": "Turn right onto Burleigh Street",
                        "time": 51630,
                        "street_name": "Burleigh Street"
                    },
                    {
                        "distance": 0.0,
                        "sign": 4,
                        "last_heading": 147.38193364150166,
                        "interval": [
                            37,
                            37
                        ],
                        "text": "Arrive at destination",
                        "time": 0,
                        "street_name": ""
                    }
                ],
                "legs": [],
                "details": {},
                "ascend": 7.010496139526367,
                "descend": 14.899995803833008,
                "snapped_waypoints": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "safety_score": 0.963512
            },
            {
                "distance": 1196.592,
                "weight": 783.047364,
                "time": 859024,
                "transfers": 0,
                "points_encoded": false,
                "bbox": [
                    -0.132246,
                    51.511304,
                    -0.120417,
                    51.515972
                ],
                "points": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.132153,
                            51.51523
                        ],
                        [
                            -0.132105,
                            51.515316
                        ],
                        [
                            -0.131688,
                            51.515421
                        ],
                        [
                            -0.131649,
                            51.515452
                        ],
                        [
                            -0.130981,
                            51.515624
                        ],
                        [
                            -0.130339,
                            51.515784
                        ],
                        [
                            -0.129886,
                            51.515865
                        ],
                        [
                            -0.129406,
                            51.515972
                        ],
                        [
                            -0.129158,
                            51.515876
                        ],
                        [
                            -0.128806,
                            51.51569
                        ],
                        [
                            -0.128689,
                            51.5156
                        ],
                        [
                            -0.127922,
                            51.51558
                        ],
                        [
                            -0.12725,
                            51.515616
                        ],
                        [
                            -0.126677,
                            51.515679
                        ],
                        [
                            -0.126788,
                            51.515543
                        ],
                        [
                            -0.12696,
                            51.515132
                        ],
                        [
                            -0.12683,
                            51.515089
                        ],
                        [
                            -0.126737,
                            51.515092
                        ],
                        [
                            -0.126665,
                            51.515073
                        ],
                        [
                            -0.125091,
                            51.513934
                        ],
                        [
                            -0.124907,
                            51.513829
                        ],
                        [
                            -0.124075,
                            51.513261
                        ],
                        [
                            -0.124164,
                            51.513207
                        ],
                        [
                            -0.1231,
                            51.512257
                        ],
                        [
                            -0.123144,
                            51.512239
                        ],
                        [
                            -0.122542,
                            51.511716
                        ],
                        [
                            -0.122129,
                            51.511902
                        ],
                        [
                            -0.122028,
                            51.51182
                        ],
                        [
                            -0.121806,
                            51.511918
                        ],
                        [
                            -0.121392,
                            51.511583
                        ],
                        [
                            -0.121182,
                            51.511702
                        ],
                        [
                            -0.121053,
                            51.51164
                        ],
                        [
                            -0.12072,
                            51.511559
                        ],
                        [
                            -0.120644,
                            51.511525
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "instructions": [
                    {
                        "distance": 6.99,
                        "heading": 113.34,
                        "sign": 0,
                        "interval": [
                            0,
                            1
                        ],
                        "text": "Continue",
                        "time": 5033,
                        "street_name": ""
                    },
                    {
                        "distance": 10.08,
                        "sign": -2,
                        "interval": [
                            1,
                            2
                        ],
                        "text": "Turn left",
                        "time": 7258,
                        "street_name": ""
                    },
                    {
                        "distance": 85.546,
                        "sign": 2,
                        "interval": [
                            2,
                            5
                        ],
                        "text": "Turn right",
                        "time": 61594,
                        "street_name": ""
                    },
                    {
                        "distance": 115.835,
                        "sign": 0,
                        "interval": [
                            5,
                            8
                        ],
                        "text": "Continue onto Soho Place",
                        "time": 83400,
                        "street_name": "Soho Place"
                    },
                    {
                        "distance": 65.031,
                        "sign": 2,
                        "interval": [
                            8,
                            11
                        ],
                        "text": "Turn right onto St Giles Square",
                        "time": 46822,
                        "street_name": "St Giles Square"
                    },
                    {
                        "distance": 140.204,
                        "sign": -2,
                        "interval": [
                            11,
                            14
                        ],
                        "text": "Turn left onto St Giles High Street",
                        "time": 100947,
                        "street_name": "St Giles High Street"
                    },
                    {
                        "street_ref": "A401",
                        "distance": 64.184,
                        "sign": 3,
                        "interval": [
                            14,
                            16
                        ],
                        "text": "Turn sharp right onto Shaftesbury Avenue",
                        "time": 46213,
                        "street_name": "Shaftesbury Avenue"
                    },
                    {
                        "distance": 10.236,
                        "sign": -2,
                        "interval": [
                            16,
                            17
                        ],
                        "text": "Turn left onto Monmouth Street",
                        "time": 7370,
                        "street_name": "Monmouth Street"
                    },
                    {
                        "distance": 281.76,
                        "sign": -7,
                        "interval": [
                            17,
                            22
                        ],
                        "text": "Keep left onto Neal Street",
                        "time": 202869,
                        "street_name": "Neal Street"
                    },
                    {
                        "street_ref": "B402",
                        "distance": 8.552,
                        "sign": 2,
                        "interval": [
                            22,
                            23
                        ],
                        "text": "Turn right onto Long Acre",
                        "time": 6157,
                        "street_name": "Long Acre"
                    },
                    {
                        "distance": 128.809,
                        "sign": -2,
                        "interval": [
                            23,
                            24
                        ],
                        "text": "Turn left onto James Street",
                        "time": 92377,
                        "street_name": "James Street"
                    },
                    {
                        "distance": 3.632,
                        "sign": 2,
                        "interval": [
                            24,
                            25
                        ],
                        "text": "Turn right onto Covent Garden",
                        "time": 2615,
                        "street_name": "Covent Garden"
                    },
                    {
                        "distance": 71.57,
                        "sign": -2,
                        "interval": [
                            25,
                            26
                        ],
                        "text": "Turn left",
                        "time": 49370,
                        "street_name": ""
                    },
                    {
                        "distance": 35.368,
                        "sign": -2,
                        "interval": [
                            26,
                            27
                        ],
                        "text": "Turn left",
                        "time": 25465,
                        "street_name": ""
                    },
                    {
                        "distance": 11.563,
                        "sign": 2,
                        "interval": [
                            27,
                            28
                        ],
                        "text": "Turn right",
                        "time": 8326,
                        "street_name": ""
                    },
                    {
                        "distance": 18.838,
                        "sign": -2,
                        "interval": [
                            28,
                            29
                        ],
                        "text": "Turn left onto Covent Garden",
                        "time": 13564,
                        "street_name": "Covent Garden"
                    },
                    {
                        "distance": 47.061,
                        "sign": 2,
                        "interval": [
                            29,
                            30
                        ],
                        "text": "Turn right onto Tavistock Court",
                        "time": 33885,
                        "street_name": "Tavistock Court"
                    },
                    {
                        "distance": 19.624,
                        "sign": -2,
                        "interval": [
                            30,
                            31
                        ],
                        "text": "Turn left onto Tavistock Street",
                        "time": 14129,
                        "street_name": "Tavistock Street"
                    },
                    {
                        "distance": 71.709,
                        "sign": 2,
                        "interval": [
                            31,
                            35
                        ],
                        "text": "Turn right onto Burleigh Street",
                        "time": 51630,
                        "street_name": "Burleigh Street"
                    },
                    {
                        "distance": 0.0,
                        "sign": 4,
                        "last_heading": 147.38193364150166,
                        "interval": [
                            35,
                            35
                        ],
                        "text": "Arrive at destination",
                        "time": 0,
                        "street_name": ""
                    }
                ],
                "legs": [],
                "details": {},
                "ascend": 5.474496841430664,
                "descend": 13.363996505737305,
                "snapped_waypoints": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "safety_score": 0.720646
            },
            {
                "distance": 1260.147,
                "weight": 814.449364,
                "time": 907080,
                "transfers": 0,
                "points_encoded": false,
                "bbox": [
                    -0.132246,
                    51.511055,
                    -0.120417,
                    51.515255
                ],
                "points": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.132153,
                            51.51523
                        ],
                        [
                            -0.131905,
                            51.514925
                        ],
                        [
                            -0.131362,
                            51.514128
                        ],
                        [
                            -0.131752,
                            51.514002
                        ],
                        [
                            -0.130706,
                            51.512483
                        ],
                        [
                            -0.130406,
                            51.512596
                        ],
                        [
                            -0.130032,
                            51.512169
                        ],
                        [
                            -0.129842,
                            51.512241
                        ],
                        [
                            -0.129555,
                            51.511969
                        ],
                        [
                            -0.129371,
                            51.51197
                        ],
                        [
                            -0.128524,
                            51.511907
                        ],
                        [
                            -0.12848,
                            51.511907
                        ],
                        [
                            -0.128482,
                            51.511924
                        ],
                        [
                            -0.128388,
                            51.511926
                        ],
                        [
                            -0.12838,
                            51.511856
                        ],
                        [
                            -0.127111,
                            51.511867
                        ],
                        [
                            -0.127113,
                            51.511792
                        ],
                        [
                            -0.125198,
                            51.511317
                        ],
                        [
                            -0.125075,
                            51.511282
                        ],
                        [
                            -0.124989,
                            51.511225
                        ],
                        [
                            -0.124806,
                            51.511055
                        ],
                        [
                            -0.123984,
                            51.511422
                        ],
                        [
                            -0.123649,
                            51.511125
                        ],
                        [
                            -0.121806,
                            51.511918
                        ],
                        [
                            -0.121392,
                            51.511583
                        ],
                        [
                            -0.121182,
                            51.511702
                        ],
                        [
                            -0.121053,
                            51.51164
                        ],
                        [
                            -0.12072,
                            51.511559
                        ],
                        [
                            -0.120644,
                            51.511525
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "instructions": [
                    {
                        "distance": 6.99,
                        "heading": 113.34,
                        "sign": 0,
                        "interval": [
                            0,
                            1
                        ],
                        "text": "Continue",
                        "time": 5033,
                        "street_name": ""
                    },
                    {
                        "distance": 134.367,
                        "sign": 1,
                        "interval": [
                            1,
                            3
                        ],
                        "text": "Turn slight right",
                        "time": 97500,
                        "street_name": ""
                    },
                    {
                        "distance": 30.382,
                        "sign": 2,
                        "interval": [
                            3,
                            4
                        ],
                        "text": "Turn right onto Bateman Street",
                        "time": 21875,
                        "street_name": "Bateman Street"
                    },
                    {
                        "distance": 183.786,
                        "sign": -2,
                        "interval": [
                            4,
                            5
                        ],
                        "text": "Turn left onto Frith Street",
                        "time": 132325,
                        "street_name": "Frith Street"
                    },
                    {
                        "street_ref": "A401",
                        "distance": 24.261,
                        "sign": -2,
                        "interval": [
                            5,
                            6
                        ],
                        "text": "Turn left onto Shaftesbury Avenue",
                        "time": 17468,
                        "street_name": "Shaftesbury Avenue"
                    },
                    {
                        "distance": 54.138,
                        "sign": 2,
                        "interval": [
                            6,
                            7
                        ],
                        "text": "Turn right onto Gerrard Place",
                        "time": 38980,
                        "street_name": "Gerrard Place"
                    },
                    {
                        "distance": 15.37,
                        "sign": -2,
                        "interval": [
                            7,
                            8
                        ],
                        "text": "Turn left onto Newport Place",
                        "time": 11067,
                        "street_name": "Newport Place"
                    },
                    {
                        "distance": 36.246,
                        "sign": 2,
                        "interval": [
                            8,
                            9
                        ],
                        "text": "Turn right onto Newport Place",
                        "time": 26097,
                        "street_name": "Newport Place"
                    },
                    {
                        "distance": 83.281,
                        "sign": -2,
                        "interval": [
                            9,
                            14
                        ],
                        "text": "Turn left onto Newport Court",
                        "time": 59963,
                        "street_name": "Newport Court"
                    },
                    {
                        "street_ref": "A400",
                        "distance": 7.803,
                        "sign": 2,
                        "interval": [
                            14,
                            15
                        ],
                        "text": "Turn right onto Charing Cross Road",
                        "time": 5618,
                        "street_name": "Charing Cross Road"
                    },
                    {
                        "distance": 87.8,
                        "sign": -2,
                        "interval": [
                            15,
                            16
                        ],
                        "text": "Turn left onto Great Newport Street",
                        "time": 63216,
                        "street_name": "Great Newport Street"
                    },
                    {
                        "street_ref": "B404",
                        "distance": 8.389,
                        "sign": 2,
                        "interval": [
                            16,
                            17
                        ],
                        "text": "Turn right onto Upper Saint Martin's Lane",
                        "time": 6040,
                        "street_name": "Upper Saint Martin's Lane"
                    },
                    {
                        "distance": 142.662,
                        "sign": -2,
                        "interval": [
                            17,
                            18
                        ],
                        "text": "Turn left onto Garrick Street",
                        "time": 102717,
                        "street_name": "Garrick Street"
                    },
                    {
                        "distance": 40.862,
                        "sign": 0,
                        "interval": [
                            18,
                            21
                        ],
                        "text": "Continue onto Bedford Street",
                        "time": 29421,
                        "street_name": "Bedford Street"
                    },
                    {
                        "distance": 69.974,
                        "sign": -2,
                        "interval": [
                            21,
                            22
                        ],
                        "text": "Turn left onto Inigo Place",
                        "time": 50382,
                        "street_name": "Inigo Place"
                    },
                    {
                        "distance": 40.369,
                        "sign": 2,
                        "interval": [
                            22,
                            23
                        ],
                        "text": "Turn right",
                        "time": 28080,
                        "street_name": ""
                    },
                    {
                        "distance": 155.073,
                        "sign": -2,
                        "interval": [
                            23,
                            24
                        ],
                        "text": "Turn left onto Henrietta Street",
                        "time": 111654,
                        "street_name": "Henrietta Street"
                    },
                    {
                        "distance": 47.061,
                        "sign": 2,
                        "interval": [
                            24,
                            25
                        ],
                        "text": "Turn right onto Tavistock Court",
                        "time": 33885,
                        "street_name": "Tavistock Court"
                    },
                    {
                        "distance": 19.624,
                        "sign": -2,
                        "interval": [
                            25,
                            26
                        ],
                        "text": "Turn left onto Tavistock Street",
                        "time": 14129,
                        "street_name": "Tavistock Street"
                    },
                    {
                        "distance": 71.709,
                        "sign": 2,
                        "interval": [
                            26,
                            30
                        ],
                        "text": "Turn right onto Burleigh Street",
                        "time": 51630,
                        "street_name": "Burleigh Street"
                    },
                    {
                        "distance": 0.0,
                        "sign": 4,
                        "last_heading": 147.38193364150166,
                        "interval": [
                            30,
                            30
                        ],
                        "text": "Arrive at destination",
                        "time": 0,
                        "street_name": ""
                    }
                ],
                "legs": [],
                "details": {},
                "ascend": 4.393503189086914,
                "descend": 12.283002853393555,
                "snapped_waypoints": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -0.132246,
                            51.515255
                        ],
                        [
                            -0.120417,
                            51.511304
                        ]
                    ]
                },
                "safety_score": 0.64256
            }
        ]
    }
} 
}

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
0;
const GOOGLE_PACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

export default function RouteView() {
  const [location, setLocation] = useState(
    null as { latitude: number; longitude: number } | null
  );
  const [heading, setHeading] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

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

  const top = useMemo(() => {
    return Math.max(
      location?.latitude ?? 0,
      ...(from ? [from.latitude] : []),
      ...(to ? [to.latitude] : []),
      ...coordinates.map((coord) => coord.latitude)
    );
  }, [coordinates, from, to]);

  const bottom = useMemo(() => {
    return Math.min(
      location?.latitude ?? 0,
      ...(from ? [from.latitude] : []),
      ...(to ? [to.latitude] : []),
      ...coordinates.map((coord) => coord.latitude)
    );
  }, [coordinates, from, to]);

  const left = useMemo(() => {
    return Math.min(
      location?.longitude ?? 0,
      ...(from ? [from.longitude] : []),
      ...(to ? [to.longitude] : []),
      ...coordinates.map((coord) => coord.longitude)
    );
  }, [coordinates, from, to]);

  const right = useMemo(() => {
    return Math.max(
      location?.longitude ?? 0,
      ...(from ? [from.longitude] : []),
      ...(to ? [to.longitude] : []),
      ...coordinates.map((coord) => coord.longitude)
    );
  }, [coordinates, from, to]);

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

  const [data, setData] = useState(dummy);

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
    setModalVisible(false);
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
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=AIzaSyCWSTzuX68Fyez5LAEWECiV6f1DnawsY8I&input=${text}`;
    try {
      const result = await axios.request({
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
        return {
          score: Math.round(x.safety_score * 10),
          walkingTime: x.time / 60000,
          arrival: `${arrivalTime.getHours()}:${arrivalTime.getMinutes()}`,
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
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
        >
          {uiState !== "destination" && uiState !== "safety" ? (
            ""
          ) : (
            <>
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
            </>
          )}
        </View>
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
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
        </Modal>
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
            <Image
              source={require("../assets/turnleft.png")}
              style={{
                width: 45,
                height: 56,
                marginRight: 20,
              }}
            ></Image>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "body",
                  color: "white",
                  fontSize: 16,
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
                mi - Arriving
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
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
