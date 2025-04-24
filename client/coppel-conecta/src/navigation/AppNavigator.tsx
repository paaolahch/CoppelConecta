import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterClientScreen from '../screens/RegisterClientScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/chatScreen';
import RewardsScreen from '../screens/RewardsScreen';
import AdministracionScreen from '../screens/AdministrationScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  RegClient: undefined;
  Routes: undefined;
  Chat: undefined;
  Rewards: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }} // Ocultamos el header 
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name='Profile' component={ProfileScreen}/>
      <Stack.Screen name='RegClient' component={RegisterClientScreen}/>
      <Stack.Screen name='Routes' component={MapScreen}/>
      <Stack.Screen name='Chat' component={ChatScreen}/>
      <Stack.Screen name='Rewards' component={RewardsScreen}/>
      <Stack.Screen name='Admin' component={AdministracionScreen}/>
    </Stack.Navigator>
  );
}
