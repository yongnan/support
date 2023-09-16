# CH08. Build a House Listing Application with React Native and Expo

In this chapter, the following topics will be covered:

- Creating a React Native project
- Routing for mobile applications
- Life cycles in React Native
- Styling components in React Native

## Getting started

### Prepare Expo client

Make sure you ``have the `Expo Client` application installed on your iOS or Android device to be able to run the application that you'll create in this chapter.

you need to create an Expo account to make the development process smoother.

### Create a React Native project

 need to globally install the Expo CLI:

```
npm install -g expo-cli
```

to create a new project using the init command from the Expo CLI:

```
expo init house-listing
```

it will ask you to answer the following questions:

1. whether to create just a blank template, a blank template with TypeScript configuration, or a sample template with some example screens set up. For this chapter, you'll need to choose the first option: **blank (expo-template-blank)**.
2. After selecting a template, you need to type in the name of your application, which is **house listing** in this case. This name will be added to the app.json file with configuration information about your application.
3. Expo automatically detects whether you have Yarn installed on your machine. If so, it will ask you to use Yarn to install other dependencies that are needed to set up your computer. If you have Yarn installed, select **yes**; otherwise, npm will be used by default. For this chapter, it's advised to use npm instead of Yarn so that you're consistent with the previous chapters.

```
cd house-listing
npm start
```

http://localhost:19002/

the `App.js` file is the entry point of your application

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

The syntax of writing styles in React Native is different from React being used in a browser, so you'll have to install styled-components later on in this chapter.

## Creating routes with React Navigation

React Navigation and its dependencies can be installed by running the following command:

```
npm install react-navigation react-navigation-stack react-navigation-tabs 

react-native-screens
react-native-reanimated
react-native-gesture-handler
react-native-safe-area-context
```

 History in React Native doesn't behave the same way as it does in a browser,

you will need to keep track of transitions between pages yourself and store a local history in your application.

you can use multiple different navigators to help you do this, including a **stack navigator** and a **tab navigator**.

1. `App.js`

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
+ import { createAppContainer } from 'react-navigation';
+ import { createStackNavigator } from 'react-navigation-stack';

export default function App() {
    ...
```

2. Instead of returning a component called App, you need to return the component that was created with createStackNavigator,

```
...
import { createStackNavigator } from 'react-navigation-stack';

- export default function App() {
- return (
+ const Home = () => (
    <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
- }

const styles = StyleSheet.create({
...
});

+ const StackNavigator = createStackNavigator({
+  Home: {
+    screen: Home,
+.   navigationOptions: { title: 'Home' },
+  },
+ });

+ export default createAppContainer(StackNavigator);
```

3. Your application now has one route, which is Home, and renders the Home component.  add title for this screen by setting the navigationOptions field
4. To create another route, adding a Detail component

```
...
import { createStackNavigator } from 'react-navigation-stack';

const Home = () => (
...
);

+ const Detail = () => (
+  <View style={styles.container}>
+    <Text>Open up App.js to start working on your app!</Text>
+  </View>
+ );

...

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { title: 'Home' },
  },
+ Detail: {
+   screen: Detail,
+   navigationOptions: { title: 'Detail' },
+ },
});

export default createAppContainer(AppNavigator);
```

5. set a default route 

```
const AppNavigator = createStackNavigator({
  Home: {
	...
	},
  Detail: {
  ....
  },
+ }, { initialRouteName: 'Home' });
- });

export default createAppContainer(AppNavigator);
```

You can see that the Detail route is also rendering by changing the value for initialRouteName to Detail, and checking whether the screen that is rendered in your application has the title Detail.

### Transitioning between screens

need to use the **navigation** prop, which is available from components that are rendered by the stack navigator. 

```
- const Home = () => (
+ const Home = ({ navigation }) => (
```

The navigation prop holds multiple values, including the navigate function, which takes a route name as a parameter. You can use this function as an event on, 

```
import React from 'react';
- import { StyleSheet, Text, View } from 'react-native';
+ import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
+   <Button onPress={() => navigation.navigate('Detail')} title='Go to Detail' />
  </View>
);

...
```

You can also create a custom return button by using the goBack function from the navigation prop, like this:

```
- const Detail = () => (
+ const Detail = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
+    <Button onPress={() => navigation.goBack()} title='Go to back to Home' />
  </View>
);

...
```

###  store these components in a different directory

1. Create a file `Screens/Home.js`

   ```
   import React from 'react';
   import { Button, StyleSheet, Text, View } from 'react-native';
   
   const Home = ({ navigation }) => (
     <View style={styles.container}>
       <Text>Open up App.js to start working on your app!</Text>
       <Button onPress={() => navigation.navigate('Detail')} title='Go to Detail' />
     </View>
   );
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
   });
   
   export default Home;
   ```

2. Create a file `Screens/Detail.js`

   ```
   import React from 'react';
   import { Button, StyleSheet, Text, View } from 'react-native';
   
   const Detail = ({ navigation }) => (
     <View style={styles.container}>
       <Text>Open up App.js to start working on your app!</Text>
       <Button onPress={() => navigation.goBack()} title='Go to back to Home' />
     </View>
   );
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
   });
   
   export default Detail;
   ```

3. modify App.js

   ```
   import React from 'react';
   - import { Button, StyleSheet, Text, View } from 'react-native';
   import { createAppContainer } from 'react-navigation';
   import { createStackNavigator } from 'react-navigation-stack';
   + import Home from './Screens/Home';
   + import Detail from './Screens/Detail';
   
   - const Home = ({ navigation }) => (
   -   <View style={styles.container}>
   -     <Text>Open up App.js to start working on your app!</Text>
   -     <Button onPress={() => navigation.navigate('Detail')} title='Go to Detail' />
   -   </View>
   - );
   
   - const Detail = ({ navigation }) => (
   -   <View style={styles.container}>
   -     <Text>Open up App.js to start working on your app!</Text>
   -     <Button onPress={() => navigation.goBack()} title='Go to back to Home' />
   -   </View>
   - );
   
   - const styles = StyleSheet.create({
   -  container: {
   -   flex: 1,
   -   backgroundColor: '#fff',
   -   alignItems: 'center',
   -   justifyContent: 'center',
   -  },
   - });
   
   const AppNavigator = createStackNavigator({
     Home: {
     ...
   ```

Your application only uses the App.js file to create the routes and set up the stack navigator. 

### Using multiple navigators together

1. using tab navigation, import from react-navigation-tabs using the following code:

   ```
   import { createStackNavigator } from 'react-navigation-stack';
   + import { createBottomTabNavigator } from 'react-navigation-tabs';
   ```

2. Suppose you want the Home screen and the adjoining Detail screen to be available on the same tab

   ```
   - const AppNavigator = createStackNavigator({
   + const HomeStack = createStackNavigator({
       Home: {
         screen: Home,
         navigationOptions: { title: 'Home' },
       },
       Detail: {
         screen: Detail,
         navigationOptions: { title: 'Detail' },
       },
   -  }, { initialRouteName: 'Home' });
   + });
   
   + const AppNavigator = createBottomTabNavigator({
   +  Home: HomeStack
   + }, { initialRouteName: 'Home' });
   
   export default createAppContainer(AppNavigator);
   ```

   The main navigation for your application is now the tab navigator,

   Faile d to compile, install below & restart

   ```
   npm install react-native-reanimated
   ```

3. To add another tab to the tab navigator that renders either a component or another stack navigator.

   new file `Screens/Settings.js`:

4. Import `Settings` to `App.js`:

   ```
   import Home from './Screens/Home';
   import Detail from './Screens/Detail';
   + import Settings from './Screens/Settings';
   
   ...
   
   const AppNavigator = createBottomTabNavigator({
      Home: HomeStack,
   +  Settings,
   }, { initialRouteName: 'Home' });
   ```

5. Your application now has a tab called Settings,  to customize it:

   ```
   ...
   
   + const SettingsStack = createStackNavigator({
   +  Settings: {
   +    screen: Settings,
   +    navigationOptions: { title: 'Settings' },
   +  },
   + });
   
   const AppNavigator = createBottomTabNavigator({
      Home: HomeStack,
   -  Settings,
   +  Settings: SettingsStack,
   }, { initialRouteName: 'Home' });
   
   export default createAppContainer(AppNavigator);
   ```

## Using life cycles in React Native

First, To fetch data, use the **fetch** API again and combine this with the **useState** and **useEffect** Hooks,

Displayed data in a React Native **FlatList** component

1. in `Screens/Home.js`:

   ```
   ...
   
   - const Home = ({ navigation }) => (
   + const Home = ({ navigation }) => {
   +  const [loading, setLoading] = React.useState(true);
   +  const [error, setError] = React.useState('');
   +  const [data, setData] = React.useState([]);
   
   +  return (
       <View style={styles.container}>
         <Text>Open up App.js to start working on your app!</Text>
         <Button onPress={() => navigation.navigate('Detail')} title='Go to Detail' />
       </View>
      )
   + };
   ```

2. need to create an asynchronous function to retrieve the data:

   ```
   const Home = ({ navigation }) => {
     const [loading, setLoading] = React.useState(true);
     const [error, setError] = React.useState('');
     const [data, setData] = React.useState([]);
   
   +  const fetchAPI = async () => {
   +    try {
   +      const data = await fetch('https://my-json-server.typicode.com/PacktPublishing/React-Projects/listings');
   +      const dataJSON = await data.json();
   
   +      if (dataJSON) {
   +        setData(dataJSON);
   +        setLoading(false);
   +      }
   +    } catch(error) {
   +      setLoading(false);
   +      setError(error.message);
   +    }
   +  };
   
   +  React.useEffect(() => {
   +    fetchAPI();
   +  }, []);
   
     return (
       ...
   ```

3. This data constant can now be added as a prop to a FlatList component

   ```
   import React from 'react';
   - import { Button, StyleSheet, Text, View } from 'react-native';
   + import { FlatList, StyleSheet, Text, View } from 'react-native';
   
   const Home = ({ navigation }) => {
   
     ...
   
     return (
       <View style={styles.container}>
   -     <Text>Open up App.js to start working on your app!</Text>
   -     <Button onPress={() => navigation.navigate('Detail')} title='Go to Detail' />
   +     {!loading && !error && <FlatList
   +       data={data}
   +       renderItem={({item}) => <Text>{item.title}</Text>}
   +     />}
       </View>
     )
   };
   
   ...
   ```

4. need to specify a keyprop on each iterated component. FlatList automatically looks for a key field in your dataobject, but if you don't have a specific key field, you need to set this using the keyExtractor prop. It's important to know that the value that's used for the key should be a string

   ```
   ...
   
     return (
       <View style={styles.container}>
        {!loading && !error && <FlatList
          data={data}
   +      keyExtractor={item => String(item.id)}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />}
       </View>
     );
   };
   
   ...
   ```

To add the navigation to the Detail route again,  you need to return a component from FlatList, which supports onPress events. 

1.  need to import the TouchableOpacity component 

   ```
   import React from 'react';
   - import { FlatList, View, Text } from 'react-native';
   + import { FlatList, View, Text, TouchableOpacity } from 'react-native';
   
   const Home = ({ navigation }) => {
     ...
   
     return (
       <View style={styles.container>
         {!loading && !error && <FlatList
           data={data}
           keyExtractor={item => String(item.id)}
   -       renderItem={({item}) => <Text>{item.text}</Text>}
   +       renderItem={({item}) => (
   +         <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
   +           <Text>{item.title}</Text>
   +         </TouchableOpacity>
   +       )}
         />}
       </View>
     );
   };
   
   ...
   ```

2. . However, you want this screen to display the item you've just pressed. 

   ```
   return (
       <View style={styles.container>
         {!loading && !error && <FlatList
           data={data}
           keyExtractor={item => String(item.id)}
           renderItem={({item}) => (
   -         <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
   +         <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
         />}
       </View>
     );
   };
   ```

3. and `Detail`:

   ```
   import React from 'react';
   - import { Button, StyleSheet, Text, View } from 'react-native';
   + import { StyleSheet, Text, View } from 'react-native';
   
   - const Detail = ({ navigation }) => (
   + const Detail = ({ navigation }) => {
   +   const item = navigation.getParam('item', {})
   
   +   return (
         <View style={styles.container}>
   -       <Text>Open up - App.js to start working on your app!</Text>
   -       <Button onPress={() => navigation.goBack()} title='Go to back to Home' />
   +       <Text>{item.title}</Text>
         </View>
       );
   + };
   
   ...
   
   export default Detail;
   ```

You're now able to view both a list of all of the listings from the mock API and a specific listing from this API.

## Styling React Native applications

```
npm install styled-components
```

 proceed by creating styling for the components

1. transforming the `View` and `FlatList` components in the `Screens/Home.js` file:

   ```
   import React from 'react';
   - import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
   + import { FlatList, Text, View, TouchableOpacity } from 'react-native';
   + import styled from 'styled-components/native';
   
   const Home = ({ navigation }) => {
     ...
   ```

2. to the `View`

   ```
   ...
   
   + const ListingsWrapper = styled(View)`
   +  flex: 1;
   +  background-color: #fff;
   +  align-items: center;
   +  justify-content: center;
   + `
   
   - const styles = StyleSheet.create({
   -   container: {
   -     flex: 1,
   -     backgroundColor: '#fff',
   -     alignItems: 'center',
   -     justifyContent: 'center',
   -   },
   - });
   
   const Home = ({ navigation }) => {
     ...
     return (
   -    <View style={styles.container}>
   +    <ListingsWrapper>
         {!loading && !error && <FlatList
           data={data}
           keyExtractor={item => String(item.id)}
           renderItem={({item}) => (
             <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
               <Text>{item.title}</Text>
             </TouchableOpacity>
           )}
         />}
   +    </ListingsWrapper>
   -    </View>
     );
   };
   
   export default Home;
   ```

3. to the FlatList:

   ```
   ...
   
   const ListingsWrapper = styled(View)`
     flex: 1;
     background-color: #fff;
     align-items: center;
     justify-content: center;
   `
   
   + const Listings = styled(FlatList)`
   +  width: 100%;
   +  padding: 5%;
   + `;
   
   const Home = ({ navigation }) => {
     ...
     return (
       <ListingsWrapper>
   -     {!loading && !error && <FlatList
   +     {!loading && !error && <Listings
           data={data}
           keyExtractor={item => String(item.id)}
           renderItem={({item}) => (
             <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
               <Text>{item.title}</Text>
             </TouchableOpacity>
           )}
         />}
       </ListingsWrapper>
     );
   };
   
   export default Home;
   ```

4. create a new component that returns multiple components containing the listings data from the mock API.  new directory called `Components`, which contains another directory called `Listing`. In this directory new file `ListingItem.js`

   ```
   import React from 'react';
   import styled from 'styled-components/native';
   import { Image, Text, View, TouchableOpacity } from 'react-native';
   
   const ListingItemWrapper = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    padding: 2%;
    background-color: #eee;
    border-radius: 5px;
    margin-bottom: 5%;
   `;
   
   export const Title = styled(Text)`
    flex-wrap: wrap;
    width: 99%;
    font-size: 20px;
   `
   
   export const Price = styled(Text)`
    font-weight: bold;
    font-size: 20px;
    color: blue;
   `
   
   const Thumbnail = styled(Image)`
    border-radius: 5px;
    margin-right: 4%;
    height: 200px;
    width: 200px;
   `
   
   const ListingItem = ({ item, navigation }) => (
    <ListingItemWrapper onPress={() => navigation.navigate('Detail', { item })}>
      <Thumbnail
        source={{uri: item.thumbnail}}
      />
      <View>
        <Title>{item.title}</Title>
        <Price>{item.price}</Price>
      </View>
    </ListingItemWrapper>
   );
   
   export default ListingItem;
   ```

5. Import above into `Screens/Home.js`:

   ```
   import React from 'react';
   - import { FlatList, View, Text, TouchableOpacity } from 'react-native';
   + import { FlatList, View } from 'react-native';
   import styled from 'styled-components/native';
   + import ListingItem from '../Components/Listing/ListingItem'
   
   ...
   const Home = ({ navigation }) => {
     ...
   
     return (
       <ListingsWrapper>
         {!loading && !error && <Listings
           data={data}
           keyExtractor={item => String(item.id)}
   -       renderItem={({item}) => (
   -         <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
   -           <Text>{item.title}</Text>
   -         </TouchableOpacity>
   -       )}
   +       renderItem={({item}) => <ListingItem item={item} />}
         />}
       </ListingsWrapper>
     );
   };
   
   export default Home;
   ```

### Differences in styling for iOS and Android

 adding icons to the tabs in the navigator tab and have different icons for iOS and Android:

1. Import the icons from Expo into the `App.js` 

   ```
   import React from 'react';
   + import { Ionicons } from '@expo/vector-icons';
   import { createAppContainer } from 'react-navigation';
   import { createStackNavigator } from 'react-navigation-s
   ```

2. define which icons should be added to the tabs for each route.

   ```
   ...
   
   const AppNavigator = createBottomTabNavigator({
     Home: HomeStack,
     Settings: SettingsStack,
   - }, { initialRouteName: 'Home' });
   + }, {
   +  initialRouteName: 'Home',
   +  defaultNavigationOptions: ({ navigation }) => ({
   +    tabBarIcon: () => {
   +      const { routeName } = navigation.state;
   
   +      let iconName;
   +      if (routeName === 'Home') {
   +        iconName = `ios-home`;
   +      } else if (routeName === 'Settings') {
   +        iconName = `ios-settings`;
   +      }
   
   +      return <Ionicons name={iconName} size={20} />;
   +    }
   +  })
   });
   
   export default createAppContainer(AppNavigator);
   ```

3. To make a distinction between iOS and Android, you need to import the Platform module from react-native. 

   ```
   import React from 'react';
   + import { Platform } from 'react-native';
   import { Ionicons } from '@expo/vector-icons';
   ```

4.  change the icon depends on device OS:

   ```
   ...
         let iconName;
         if (routeName === 'Home') {
   -       iconName = `ios-home`;
   +       iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-home`;
         } else if (routeName === 'Settings') {
   -       iconName = `ios-settings`;
   +       iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-settings`;
         }
   
         return <Ionicons name={iconName} size={20} />;
   ```

> Tips: 
>
> Run app on Android  virtaul device
>
> * https://docs.expo.io/versions/latest/workflow/android-studio-emulator/
>
> * https://developer.android.com/studio/run/emulator?gclid=Cj0KCQjwyPbzBRDsARIsAFh15JYH_2tVSAnM2voGci5bLYugNhzhL83gBu7UVNoWy7Pg2CsIPr07O2waAqbDEALw_wcB#install
>
> 1. Download Android studio: https://developer.android.com/studio
>
> 2. To install the Android Emulator, select the **Android Emulator** component in the **SDK Tools** tab of the **SDK Manager**. For instructions, see [Update your tools using the SDK Manager](https://developer.android.com/studio/intro/update#sdk-manager).
>
> 3. Go to Preferences -> Appearance & Behavior -> System Settings -> Android SDK. Click on the "SDK Tools" tab and make sure you have at least one version of the "Android SDK Build-Tools" installed.
>
> 4. Copy or remember the path listed in the box that says "Android SDK Location."
>
> 5. If you are on macOS or Linux, add the Android SDK location to your PATH using `~/.bash_profile` or `~/.bash_rc`. You can do this by adding a line like `export ANDROID_SDK=/Users/myuser/Library/Android/sdk`.
>
> 6. On macOS, you will also need to add `platform-tools` to your `~/.bash_profile` or `~/.bash_rc.`, by adding a line like `export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH`
>
> 7. From the Android Studio main screen, go to `Configure -> AVD Manager`.
>
> 8. Press the "+ Create Virtual Device" button.
>
> 9. hoose the type of hardware you'd like to emulate. We recommend testing against a variety of devices, but if you're unsure where to start, the newest device in the Pixel line could be a good choice.
>
> 10. Select an OS version to load on the emulator (probably one of the system images in the "Recommended" tab), and download the image.
>
> 11. Change any other settings you'd like, and press "Finish" to create the virtual device. You can now run this device anytime by pressing the Play button in the AVD Manager window.
>
> 12. Start the virtual device from Android studio before launching App on Android device.
>
> 13. vi ~/.zshrc or ~/.bashrc
>
>     export ANDROID_SDK=ANDROID_SDK_LOCATION
>
>     export PATH=ANDROID_SDK_LOCATION/platform-tools:$PATH
>
>     export PATH=ANDROID_SDK_LOCATION/tools:$PATH

 5. can specify the colors of the icons and the labels in the active and inactive state

    ```
    ...
    const AppNavigator = createBottomTabNavigator({
      Home: HomeStack,
      Settings: SettingsStack,
    }, {
      initialRouteName: 'Home',
      defaultNavigationOptions: ({ navigation }) => ({
    	...
    
          return <Ionicons name={iconName} size={20} />;
        },
    +   tabBarOptions: {
    +      activeTintColor: 'blue',
    +      inactiveTintColor: '#556',
    +   },
      })
    });
    
    export default createAppContainer(AppNavigator);
    ```

to Style `Detail` screen, 

 Any file that has the *.ios.js or *.android.js extension will only be rendered on the platform specified in the extension.

1. create a new file called `Components/Listing/ListingDetail.android.js` 

   ```
   import React from 'react';
   import styled from 'styled-components/native';
   import { Image, Text, View, Dimensions } from 'react-native';
   
   const ListingDetailWrapper = styled(View)`
     display: flex;
   `;
   
   const Details = styled(View)`
     padding: 5%;
   `
   
   export const Title = styled(Text)`
     flex-wrap: wrap;
     width: 99%;
     font-size: 30px;
   `
   
   export const Price = styled(Text)`
     font-weight: bold;
     font-size: 20px;
     color: blue;
   `
   
   const Thumbnail = styled(Image)`
     width: 100%;
     height: ${Dimensions.get('window').width};
   `
   
   const ListingDetail = ({ item }) => (
     <ListingDetailWrapper>
       <Thumbnail
         source={{uri: item.thumbnail}}
       />
       <Details>
         <Title>{item.title}</Title>
         <Price>{item.price}</Price>
       </Details>
     </ListingDetailWrapper>
   );
   
   export default ListingDetail;
   ```

   

2. need to create a new file called `Components/Listing/ListingDetail.ios.js`

   ```
   import React from 'react';
   import styled from 'styled-components/native';
   import { Image, Text, View, Dimensions } from 'react-native';
   
   const ListingDetailWrapper = styled(View)`
     display: flex;
   `;
   
   const Details = styled(View)`
     position: absolute;
     top: 0;
     padding: 5%;
     width: 100%;
     background: rgba(0, 0, 255, 0.1);
   `
   
   export const Title = styled(Text)`
     flex-wrap: wrap;
     width: 99%;
     font-size: 30px;
   `
   
   export const Price = styled(Text)`
     font-weight: bold;
     font-size: 20px;
     color: blue;
   `
   
   const Thumbnail = styled(Image)`
     width: 100%;
     height: ${Dimensions.get('window').height};
   `
   
   const ListingDetail = ({ item }) => (
     <ListingDetailWrapper>
       <Thumbnail
         source={{uri: item.thumbnail}}
       />
       <Details>
         <Title>{item.title}</Title>
         <Price>{item.price}</Price>
       </Details>
     </ListingDetailWrapper>
   );
   
   export default ListingDetail;
   ```

3. changes need to made to the `Screens/Detail.js` file:

   ```
   import React from 'react';
   import { StyleSheet, Text, View } from 'react-native';
   + import ListingDetail from '../Components/Listing/ListingDetail';
   
   const Detail = ({ navigation }) => {
     const item = navigation.getParam('item', {});
   
     return (
   -  <View style={styles.container}>
   +  <ListingDetail item={item} />
   -  </View>
     )
   };
   
   - const styles = StyleSheet.create({
   -  container: {
   -    flex: 1,
   -    backgroundColor: '#fff',
   -    alignItems: 'center',
   -    justifyContent: 'center',
   -  },
   - });
   
   export default Detail;
   ```

# Further reading

- To find out more about custom headers in React Navigation, check out this link: https://reactnavigation.org/docs/en/headers.html.
- You can find a list of Expo icons here: https://expo.github.io/vector-icons/.