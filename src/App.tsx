// // In App.js in a new project

// import * as React from 'react';
// import {View, Text, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';

// // function HomeScreen({navigation}) {
// //   return (
// //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //       <Text>Home Screen S</Text>
// //       <Button
// //         title="Go to Details"
// //         onPress={() => navigation.navigate('Details')}
// //       />
// //     </View>
// //   );
// // }
// // function DetailsScreen({navigation}) {
// //   return (
// //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //       <Text>Details Screen</Text>
// //       <Button
// //         title="Go to Details... again"
// //         onPress={() => navigation.push('Details')}
// //       />
// //       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
// //       <Button title="Go back" onPress={() => navigation.goBack()} />
// //       <Button
// //         title="Go back to first screen in stack"
// //         onPress={() => navigation.popToTop()}
// //       />
// //     </View>
// //   );
// // }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Settings Screen</Text>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Profile')}
//       />
//     </View>
//   );
// }

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// }

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.push('Details')}
//       />
//     </View>
//   );
// }
// // const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const SettingsStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();

// // function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           name="Home"
// //           component={HomeScreen}
// //           options={{title: 'Overview'}}
// //         />
// //         <Stack.Screen name="Details" component={DetailsScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="First">
//           {() => (
//             <SettingsStack.Navigator>
//               <SettingsStack.Screen
//                 name="Settings"
//                 component={SettingsScreen}
//               />
//               <SettingsStack.Screen name="Profile" component={ProfileScreen} />
//             </SettingsStack.Navigator>
//           )}
//         </Tab.Screen>
//         <Tab.Screen name="Second">
//           {() => (
//             <HomeStack.Navigator>
//               <HomeStack.Screen name="Home" component={HomeScreen} />
//               <HomeStack.Screen name="Details" component={DetailsScreen} />
//             </HomeStack.Navigator>
//           )}
//         </Tab.Screen>
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;


import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TargetSum from './screens/TargetSumGame';
const Tab = createBottomTabNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor:'lightblue' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="TargetSum"  options={{randomNumeberCount: 6}}  component={TargetSum} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
