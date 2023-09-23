import React from "react";
import { Text, View } from "react-native";
import { Query } from 'react-apollo';
import styled from "styled-components/native";
import { GET_CONVERSATION } from '../constants';
import ConversationActions from "../Components/Conversation/ConversationActions";
import ConversationBody from '../Components/Conversation/ConversationBody';

const Conversation = ({navigation }) => {
    const item = navigation.getParam("item", {});
    const userName = item.userName
    //console.log(`userName=${userName}`)
  return (
    <ConversationWrapper>
        <Query query={GET_CONVERSATION} variables={{ userName }}>
            {({ subscribeToMore, loading, data }) => {
                console.log('subscribeToMore', subscribeToMore)
               if (loading) {
                   return <ConversationBodyText>Loading...</ConversationBodyText>;
               }
               const { messages } = data.conversation;
               //  console.log(`messages=61 `, messages)

                return <ConversationBody messages={messages} userName={userName}
                                         subscribeToMore={subscribeToMore} />
            }}
        </Query>
      <ConversationActions userName={userName} />
    </ConversationWrapper>
  );
};

const ConversationWrapper = styled(View)`
  flex: 1;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const ConversationBodyText = styled(Text)`
  font-size: 20px;
  color: black;
`;

export default Conversation;
