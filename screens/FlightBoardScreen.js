import React, { useState, useRef } from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity, Animated, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function FlightBoardScreen() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user)
  console.log('flightScreeen user:',user);

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
  // route post pour mettre une annonce selon sa date de vol qui sera dans le réducers 
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [kilo, setKilo] = useState('');
  const [result, setResult] = useState('');

  const handleAddKilo = () => {
    const requestBody = {
      token: user.token,
      flyNumber: user.flyNumber,
      date: user.date,
      kilo: '10',
    };

    fetch(`https://share-fly-backend.vercel.app/kilos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.result ? 'Kilo added successfully' : `Error: ${data.error}`);
      })
      .catch(error => {
        setResult(`Error: ${error}`);
      });
  };


// route post flight pour récupérer les données selon la date et le flyNumber
const [flightData, setFlightData] = useState ([]);

const fetchFlightData = () => {
  fetch("https://share-fly-backend.vercel.app/kilos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: user.token,
      flyNumber: user.flyNumber,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        setFlightData(data);
      } else {

        setErrorMessage("No flight found");
        console.log(error);
      }
    })
    .catch((error) => {
      setErrorMessage("Failed to fetch");
      console.log("Error:", error);
    });
};
const handleClose = () => {
  setModalVisible(false);
};

//Pour les "Flight" ça devra prendre les kilos on doit fetch les annonces de kilos des autres personnes 
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
      //Animation de déroulement lors du onPress
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
            <View>
              <Text>Additional Content</Text>
              <Text>Additional Content</Text>
              <Text>Additional Content</Text>
            </View>
            <TouchableOpacity style={styles.buttonBuy} onPress={() => navigation.navigate('Buy')} activeOpacity={0.8} >
              <Text>Buy</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };
   // Le map qui va prendre toute les données du dataFlight
  const Flight = dataFlight.map((flight) => renderFlightItem(flight))
  
  // rediriger l'utilisateur vers le screen enregistrer un flight s'il en n'a pas
  // du coup faire une modale? pour informer l'utilisateur qu'il n'a rien
  
  const handleLongPress = () => {
    setModalVisible(true);
  };
  
  //____________rediriger l'utilisateur vers le screen enregistrer un flight s'il en a pas
  
  return (
    <View style={styles.container}>

<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.square} activeOpacity={0.8}>
      <Text style={styles.squareText}>+</Text>
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter kilo"
            onChangeText={(value) => {
              console.log(value);
              setKilo(value);
            }}
            value={kilo}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => handleAddKilo()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
      <Text style={styles.result}>{result}</Text>
      {Flight}
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
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBuy: {
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 25,
    marginTop: 10,
  },
  buyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }  
});
