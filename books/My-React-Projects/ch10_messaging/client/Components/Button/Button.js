import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const Button = ({ title, onPress, ...props }) => (
  <StyledButton onPress={onPress} {...props}>
    <StyledButtonText>{title}</StyledButtonText>
  </StyledButton>
);

const StyledButton = styled(TouchableOpacity)`
  width: ${({ width }) => `${width}%`}
  padding: ${({ padding }) => `${padding}px`}
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  background-color: green;
`;

const StyledButtonText = styled(Text)`
  color: white;
  font-size: 28px;
`;

Button.defaultProps = {
  width: 90,
  padding: 20
};

export default Button;
