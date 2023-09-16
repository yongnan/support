import React from "react";
import { Dimensions, Platform, TouchableOpacity, Image, Text, View, Alert } from "react-native";
import styled from "styled-components/native";
import Button from "../Components/Button/Button";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Mutation } from 'react-apollo';
import { ADD_POST, GET_POSTS } from '../constants';

const AddPost = ({ navigation, showActionSheetWithOptions }) => {
    const [imageUrl, setImageUrl] = React.useState(false);

    const addImageAsync = async (camera = false) => {
        const result = !camera
            ? await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4], })
            : await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 4]

            })
        if (!result.cancelled) {
            //console.log(`result.uri= ${result.uri}`)
            setImageUrl(result.uri);
        }
    };

    const openActionSheet = async () => {
        const options = ['Camera', 'Camera roll', 'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            buttonIndex => {
                if (buttonIndex === 0 || buttonIndex === 1) {
                    addImageAsync(buttonIndex === 0);
                }
            },
        );
    };
    const getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status: statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
            const { status: statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (statusCamera !== 'granted' || statusCameraRoll !== 'granted') {
                alert(`Sorry, you need camera roll permissions! Go to 'Settings > Expo' to enable these.`);
            } else {
                await openActionSheet();
            }
        }
    };
    return (
        <AddPostWrapper>
            <AddPostText>Add Post</AddPostText>
            <Mutation mutation={ADD_POST} refetchQueries={[{ query: GET_POSTS }]}>
                {addPost => (
                    <>
                        <UploadImage onPress={() => getPermissionAsync()}>
                            {imageUrl ? (
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <AddPostText>Upload image</AddPostText>
                            )}
                        </UploadImage>
                        {imageUrl && (
                            <Button
                                onPress={() => {
                                    //console.log(`imageUrl=${imageUrl}`)
                                    addPost({ variables: { image: imageUrl, text: "" } }).then(() =>
                                        navigation.navigate('Main')
                                    ).catch(error => {
                                        console.log('error', error)
                                            Alert.alert(
                                                'Error',
                                                error.graphQLErrors.map(({ message }) => message)[0]
                                            );
                                    })
                                }}
                                title='Submit'
                            />
                        )}
                    </>
                    )}
            </Mutation>
            <Button onPress={() => navigation.navigate("Main")} title="Cancel" />
        </AddPostWrapper>
    );
};

const AddPostWrapper = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  margin: 60px 0;
`;

const AddPostText = styled(Text)`
  font-size: 20px;
  color: black;
`;

const UploadImage = styled(TouchableOpacity)`
  width: ${Dimensions.get("window").width * 0.98};
  height: ${Dimensions.get("window").width * 0.98};
  margin: ${Dimensions.get("window").width * 0.01}px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConnectedApp = connectActionSheet(AddPost);
export default ConnectedApp
