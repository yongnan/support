import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, ScrollView, FlatList, Text} from 'react-native';
import Message from '../Message/Message';
import { MESSAGE_ADDED } from '../../constants';

const ConversationBody = ({ subscribeToMore, userName, messages }) => {
    //console.log(`messages `, messages)
    console.log(`userName `, userName)
    React.useEffect(() => {
        console.log(`React.useEffect`)
        subscribeToMore({
            document: MESSAGE_ADDED,
            variables: { userName },
            updateQuery: (previous, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return previous;
                }
                //console.log('subscriptionData.data',subscriptionData.data)
                const messageAdded = subscriptionData.data.messageAdded;
                console.log('messageAdded', messageAdded)

                return Object.assign({}, previous, {
                    conversation: {
                        ...previous.conversation,
                        messages: messageAdded === null
                        ? [...previous.conversation.messages]
                        : [...previous.conversation.messages, messageAdded]
                    }
                });
            }
        });
    }, []);

    return (
        <ConversationBodyWrapper>
            <MessagesList
                data={messages}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <Message align={item.userName === 'me' ? 'left' : 'right'}>
                        {item.userName} : {item.text}
                    </Message>
                )}
            />
        </ConversationBodyWrapper>
    );
};

const ConversationBodyWrapper = styled(ScrollView)`
  width: 100%;
  padding: 2%;
  display: flex;
  height: ${Dimensions.get('window').height * 0.6};
`;

const MessagesList = styled(FlatList)`
 width: 100%;
`;
const ConversationsText = styled(Text)`
  font-size: 20px;
  color: black;
`;

export default ConversationBody;