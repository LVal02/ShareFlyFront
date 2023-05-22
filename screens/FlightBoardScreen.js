import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// import { useLatest } from "react-use";


export default function FlightBoardScreen() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  console.log('flightBoardScreen user:', user);

  const dataKilo = [
    {
      _id: '64639b67a2c70f4fdfc7ffca',
      flight: '555XXX',
      kilo: '10',
      user: 'Franc',
      __v: 3
    },
    {
      _id: '165165q4s89f48qs16161sd1',
      flight: '555XXX',
      kilo: '50',
      user: 'Max',
      __v: 3
    },
    {"__v": 0, "_id": "64676e62635c12ad86bc8b09", "flight": null, "kilo": 16, "user": {"__v": 0, "_id": "646359b6d21dce2b985f5322", "email": "test2@hotmail.com", "firstname": "testFirst2", "lastname": "testLast2", "password": "$2b$10$X2oFyqAg4TxO4M36T39O7efgGd5suUY4PRY.1v8RPy1jdOZZhIWqy", "token": "XJAac1KlpEw24QGU89AuOSpxSM0Dmosk", "username": "test2"}}, 
    {"__v": 0, "_id": "64676e840d7eb43143c320d4", "flight": null, "kilo": 17, "user": {"__v": 0, "_id": "646359b6d21dce2b985f5322", "email": "test2@hotmail.com", "firstname": "testFirst2", "lastname": "testLast2", "password": "$2b$10$X2oFyqAg4TxO4M36T39O7efgGd5suUY4PRY.1v8RPy1jdOZZhIWqy", "token": "XJAac1KlpEw24QGU89AuOSpxSM0Dmosk", "username": "test2"}}
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [kilo, setKilo] = useState('');
  const [result, setResult] = useState('');

  const [annonceKilo, setAnnonceKilo] = useState(null);
  // const latestAnnonceKilo = useLatest(annonceKilo)
  
  useEffect(() => {
    const resquestBodyFetchkilo = {
      flyNumber: user.flyNumber,
      date: user.date,
      token: user.token,
      username: user.username,
    }
    console.log("resquestBodyFetchkilo",resquestBodyFetchkilo);
    fetch('https://share-fly-backend.vercel.app/kilos/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resquestBodyFetchkilo),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('data', data);
          setAnnonceKilo(data);
          dataKilo.push(data)
        } else {
          setErrorMessage('No Annonce found');
          console.log(data.error);
        }
      });
  }, []);

  const handleAddKilo = () => {
    const requestBody = {
      token: user.token,
      username: user.username,
      flyNumber: user.flyNumber,
      date: user.date,
      kilo: kilo,
      objectId: user.flightObjectId,
    };
    console.log('requestBody:', requestBody);

    fetch('https://share-fly-backend.vercel.app/kilos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server Response:', data);
        setResult(data.result ? 'Kilo added successfully' : `Error: ${data.error}`);
      })
      .catch(error => {
        setResult(`Error: ${error}`);
        console.log(error);
      });
  };

  const [expandedFlights, setExpandedFlights] = useState([]);
  const handleFlightPress = flightId => {
    if (expandedFlights.includes(flightId)) {
      setExpandedFlights(expandedFlights.filter(id => id !== flightId));
    } else {
      setExpandedFlights([...expandedFlights, flightId]);
    }
  };

  let kilosAnnonce;
  kilosAnnonce = dataKilo.map(annonce => {
    const isExpanded = expandedFlights.includes(annonce._id);
    const contentHeight = useRef(new Animated.Value(0)).current;
    const contentMaxHeight = useRef(50).current;

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
      handleFlightPress(annonce._id);
    };

    return (
      <TouchableOpacity
        style={styles.flightItem}
        onPress={handleToggle}
        key={annonce._id}
      >
        <Text>Fly Number: {annonce.flyNumber}</Text>
        <Text>Date: {annonce.date}</Text>
        {isExpanded && (
          <Animated.View style={[styles.dropdownContent, { height: contentHeight }]}>
            <View>
              <Text>Additional Content</Text>
              <Text>Additional Content</Text>
              <Text>Additional Content</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonBuy}
              onPress={() =>
                navigation.navigate('Buy', {
                  flightId: annonce._id,
                  date: user.date,
                  kilo: annonce.kilo,
                  user: annonce.user,
                })
              }
              activeOpacity={0.8}
            >
              <Text>Buy</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  });

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.square} activeOpacity={0.8}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={handleModalClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter kilo"
              onChangeText={value => setKilo(value)}
              value={kilo}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddKilo} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModalClose} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.result}>{result}</Text>

      {kilosAnnonce}
      <Text>{errorMessage}</Text>
      <TouchableOpacity onPress={() => setErrorMessage('Check')} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Fetch</Text>
      </TouchableOpacity>
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
    borderRadius: 5,
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
  },
});
