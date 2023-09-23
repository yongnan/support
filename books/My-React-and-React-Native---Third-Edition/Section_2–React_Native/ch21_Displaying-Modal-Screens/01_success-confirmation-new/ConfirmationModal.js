import React from "react";
import PropTypes from "prop-types";
import { View, Text, Modal } from "react-native";
import styles from "./styles";

export default function ConfirmationModal(props) {
  return (
    <Modal {...props}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>
          <Text style={styles.modalText}>Dude, srsly?</Text>
          <Text style={styles.modalButton} onPress={props.onPressConfirm}>
            Yep
          </Text>
          <Text style={styles.modalButton} onPress={props.onPressCancel}>
            Nope
          </Text>
        </View>
      </View>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPressConfirm: PropTypes.func.isRequired,
  onPressCancel: PropTypes.func.isRequired
};

ConfirmationModal.defaultProps = {
  transparent: true,
  onRequestClose: () => {}
};
