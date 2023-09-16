import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";

export default function ConfirmationAlert(props) {
  useEffect(() => {
    if (props.visible) {
      Alert.alert(props.title, props.message, props.buttons);
    }
  });

  return null;
}

ConfirmationAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  buttons: PropTypes.array
};
