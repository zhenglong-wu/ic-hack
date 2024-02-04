import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../Colors";

export default function RouteOption(props: {
  score: number;
  walkingTime: number;
  arrival: string;
  safest?: boolean;
  index: number;
  selected: boolean;
  selectOption: (number: number) => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={() => props.selectOption(props.index)}>
      <View style={[styles.container, props.selected ? styles.selected : {}]}>
        <View
          style={[
            { backgroundColor: getBackgroundColor(props.score) },
            styles.indicator,
          ]}
        >
          <Text
            style={[{ color: getForegroundColor(props.score) }, styles.score]}
          >
            {props.score}
          </Text>
          <Text
            style={[
              { color: getForegroundColor(props.score) },
              styles.scoreDescription,
            ]}
          >
            {getSafetyText(props.score)}
          </Text>
        </View>
        <View style={styles.info}>
          {props.safest ? (
            <View style={styles.routeDescriptorParent}>
              <Image
                style={[
                  { tintColor: getForegroundColor(props.score) },
                  styles.routeDescriptorIcon,
                ]}
                source={require("../assets/safest.png")}
              />
              <Text
                style={[
                  { color: getForegroundColor(props.score) },
                  styles.routeDescriptor,
                ]}
              >
                Safest Route Available
              </Text>
            </View>
          ) : null}
          <Text style={styles.walkingTime}>
            {props.walkingTime} Minutes Walk
          </Text>
          <Text style={styles.algorithm}>
            Our algorithm calculated that this route avoids dangerous areas
          </Text>
        </View>
        <View style={styles.estimated}>
          <Image
            style={styles.estimatedIcon}
            source={require("../assets/clock.png")}
          />
          <Text style={styles.estimatedText}>{props.arrival}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function getSafetyText(score: number) {
  if (score >= 8) {
    return "SAFER";
  } else if (score >= 5) {
    return "SAFE";
  } else {
    return "RISKY";
  }
}

function getForegroundColor(score: number) {
  if (score >= 8) {
    return colors.score.safe;
  } else if (score >= 5) {
    return colors.score.warning;
  } else {
    return colors.score.warning;
  }
}

function getBackgroundColor(score: number) {
  if (score >= 8) {
    return colors.indicator.safe;
  } else if (score >= 5) {
    return colors.indicator.warning;
  } else {
    return colors.indicator.warning;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selected: {
    borderColor: colors.selectedRouteBorder,
  },
  indicator: {
    width: 70,
    height: 70,
    justifyContent: "center",
    borderRadius: 10,
  },
  score: {
    fontFamily: "score",
    fontSize: 28,
    textAlign: "center",
  },
  scoreDescription: {
    fontFamily: "score",
    fontSize: 12,
    textAlign: "center",
  },
  info: {
    flex: 1,
    // flexWrap: "wrap",
    marginLeft: 15,
    justifyContent: "center",
  },
  walkingTime: {
    fontFamily: "body",
    color: colors.foreground,
    fontSize: 16,
    marginBottom: 1,
  },
  algorithm: {
    fontFamily: "body",
    color: colors.foregroundLight,
    fontSize: 10,
    lineHeight: 12,
  },
  routeDescriptor: {
    fontFamily: "body",
    fontSize: 11,
  },
  routeDescriptorParent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  routeDescriptorIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  estimated: {
    marginLeft: 10,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  estimatedIcon: {
    width: 14,
    height: 14,
    marginBottom: 2,
  },
  estimatedText: {
    fontFamily: "body",
    color: colors.foreground,
    fontSize: 11,
    textAlign: "right",
  },
});
