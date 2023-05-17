import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function FlightBoardScreen() {
  const dataFlight = [
    {
      _id: '64639b67a2c70f4fdfc7ffca',
      flyNumber: '555XXX',
      date: '2023-04-27T13:22:42.000Z',
      users: [],
      __v: 3
    },
    {
      _id: '165165q4s89f48qs16161sd1',
      flyNumber: '555XXX',
      date: '2023-04-27T13:22:42.000Z',
      users: [],
      __v: 3
    }
  ];

  const [expandedFlights, setExpandedFlights] = useState([]);

  const handleFlightPress = (flightId) => {
    if (expandedFlights.includes(flightId)) {
      setExpandedFlights(expandedFlights.filter((id) => id !== flightId));
    } else {
      setExpandedFlights([...expandedFlights, flightId]);
    }
  };

  const renderFlightItem = (flight) => {
    const isExpanded = expandedFlights.includes(flight._id);
    const contentHeight = useRef(new Animated.Value(0)).current;
    const contentMaxHeight = useRef(50).current; // Définir la hauteur maximale souhaitée

    const handleToggle = () => {
      if (!isExpanded) {
        Animated.timing(contentHeight, {
          toValue: contentMaxHeight,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(contentHeight, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
      handleFlightPress(flight._id);
    };

    return (
      <TouchableOpacity
        style={styles.flightItem}
        onPress={handleToggle}
        key={flight._id}
      >
        <Text>Fly Number: {flight.flyNumber}</Text>
        <Text>Date: {flight.date}</Text>
        {isExpanded && (
          <Animated.View style={[styles.dropdownContent, { height: contentHeight }]}>
            <Text>Additional Content</Text>
            <Text>Additional Content</Text>
            <Text>Additional Content</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text>FlightBoardScreen</Text>
      {dataFlight.map((flight) => renderFlightItem(flight))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flightItem: {
    backgroundColor: '#e8be4b',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  dropdownContent: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
