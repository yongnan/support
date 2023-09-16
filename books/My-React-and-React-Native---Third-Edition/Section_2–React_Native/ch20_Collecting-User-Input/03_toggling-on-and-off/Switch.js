import React from "react";
import PropTypes from "prop-types";
import { View, Text, Switch } from "react-native";
import styles from "./styles";

export default function CustomSwitch(props) {
  return (
    <View style={styles.customSwitch}>
      <Text>{props.label}</Text>
      <Switch {...props} />
    </View>
  );
}

CustomSwitch.propTypes = {
  label: PropTypes.string
};
