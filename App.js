import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, View } from "react-native";

// Screens
import StartScreen from "./screens/StartScreen";
import HomeScreen from "./screens/HomeScreen";
import FlightSubmissionScreen from "./screens/FlightSubmissionScreen";
import FlightBoardScreen from "./screens/FlightBoardScreen";
import UserProfilScreen from "./screens/UserProfilScreen";
import ChatScreen from "./screens/ChatScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SnapScreen from "./screens/SnapScreen";
import ContratScreen from "./screens/ContratScreen";

// ______Screens
//Components 
import SnapHeader from "./components/SnapHeader";
//______Components
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import BuyScreen from "./screens/BuyScreen";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Chat") {
            iconName = "comments-o";
          } else if (route.name === "Profil") {
            iconName = "user-circle-o";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e8be4b",
        tabBarInactiveTintColor: "#b2b2b2",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profil" component={UserProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="FlightSubmission" component={FlightSubmissionScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="TabNavigator" component={MainTabNavigator} />
          <Stack.Screen name="Snap" component={SnapScreen} options={{ header: (props) => <SnapHeader {...props} /> }}/>
          <Stack.Screen name="FlightBoard" component={FlightBoardScreen} />
          <Stack.Screen name="Buy" component={BuyScreen} />
          <Stack.Screen name="Contrat" component={ContratScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
