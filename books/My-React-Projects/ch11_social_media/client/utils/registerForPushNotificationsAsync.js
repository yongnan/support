import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        //console.log(`finalStatus=${finalStatus}`)
        alert('Failed to get push token for push notification!');
        return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token

    // for debug
    // console.log('Before getExpoPushTokenAsync', finalStatus)
    // Notifications.getExpoPushTokenAsync().then( token => {
    //     console.log('token', token)
    //     resolve(token)
    // }).catch( err => {
    //     console.log('token err', err)
    //     reject('Get pushToken failed')
    // })

}

export default registerForPushNotificationsAsync;
