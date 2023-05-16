import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

//Screens
import HomeScreen from "./screens/HomeScreen";
import FlightSubmissionScreen from "./screens/FlightSubmissionScreen";
import FlightBoardScreen from "./screens/FlightBoardScreen";
import UserProfilScreen from "./screens/UserProfilScreen";
import ChatScreen from "./screens/ChatScreen";
import SignUpScreen from "./screens/SignUpScreen";
//______Screens


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const store = configureStore({
  
  reducer: {
    user: userReducer,
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {


  // Navigation
  const TabNavigator = () => {

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Submission') {
              iconName = 'edit';
            } else if (route.name === 'Chat') {
              iconName = 'comments-o';
            } else if (route.name === 'Profil') {
              iconName = 'user-circle-o';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e8be4b',
          tabBarInactiveTintColor: '#b2b2b2',
        })}
      >
        <Tab.Screen name="Submission" component={FlightSubmissionScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profil" component={UserProfilScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
