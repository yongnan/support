import React from "react";
import { Platform, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
//import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components/native";

const ConversationItem = ({ item, navigation }) => {
    return(
      <ConversationItemWrapper
        onPress={() =>
          navigation.navigate("Conversation", { item: item, serName: item.userName })
        }
      >
        <ThumbnailWrapper>
          <Ionicons
            name={`${Platform.OS === "ios" ? "ios" : "md"}-contact`}
            size={60}
            color="green"
          />
        </ThumbnailWrapper>
        <View>
          <UserName>{item.userName}</UserName>
          <Message>{item.messages[0].text}</Message>
        </View>
      </ConversationItemWrapper>
)}

const ConversationItemWrapper = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  padding: 2%;
  border: 1px solid #ccc;
  margin-bottom: 2%;
`;

const ThumbnailWrapper = styled(View)`
  padding-right: 2%;
`;

const UserName = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;

const Message = styled(Text)`
  flex-wrap: wrap;
  max-width: 95%;
  font-size: 14px;
`;

export default ConversationItem;
