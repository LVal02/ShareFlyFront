import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Screen 
import HomeScreen from "./screens/HomeScreen";
import FlightQuery from "./screens/FlightQuery";
import FlightBoard from "./screens/FlightBoard";

///Screen
//reducers

////reducer


import { StyleSheet, Text, View } from 'react-native';

export default function App() {


  //La navigation 
  const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
  
          if (route.name === 'Snap') {
            iconName = 'camera';
          } else if (route.name === 'Gallery') {
            iconName = 'image';
          }
  
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e8be4b',
        tabBarInactiveTintColor: '#b2b2b2',
        headerShown: false,
      })}>
        <Tab.Screen name="Snap" component={SnapScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
    </View>
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
