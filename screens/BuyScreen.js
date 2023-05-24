import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

export default function BuyScreen({ route }) {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [result, setResult] = useState('')
  const userOne = useSelector(state => state.user);
  console.log('buyScreen userOne:', userOne);

  const { kiloId, kilo, username, date, flyNumber, flightId } = route.params;
  console.log('buyScreen route.params:', route);

  if (!kiloId) {
    return (
      <View style={styles.container}>
        <Text>Erreur: kiloId est manquant</Text>
      </View>
    );
  }

  const handleBuyToCreateChat = () => {
    const requestBody = {
      token: userOne.token,
      flyNumber: flyNumber,
      date: date,
      username: userOne.username,
      usernameTwo: username,
      objectId: flightId,
    };
    console.log('requestBody:', requestBody);

    fetch('https://share-fly-backend.vercel.app/chats/creat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.result ? 'Chat created successfully' : `Error: ${data.error}`);
        console.log('Server Response:', data);
        // navigation.navigate('TabNavigator', { screen: 'Chat' });
      })
      .catch(error => {
        setResult(`Error: ${error}`);
        console.log(error);
      });
  };
  
  const handleUpdateKiloBuy = () => {
    const requestBodyBuy = {
      id: kiloId,
      token: userOne.token,
      username: userOne.username
      // Autres champs à mettre à jour si nécessaire
    };
    console.log("requestBodyBuy", requestBodyBuy);
    fetch("http://192.168.110.74:3000/index/kilos/buy", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBodyBuy),
    })
      .then(response => response.json())
      .then(result => {
        console.log("/index/kilos/buy",result);
        // Gérer la réponse de la mise à jour ici
      })
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <Text>Order Summary</Text>
        <Text>kiloId ID: {kiloId}</Text>
        <Text>Payer les {kilo} Kg</Text>
        <Text>Pour le {date}</Text>

        <Text>Payment details</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Cardholder Name"
            autoCapitalize="none"
            onChangeText={value => setCardholderName(value)}
            value={cardholderName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="card" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Card Number"
            autoCapitalize="none"
            onChangeText={value => setCardNumber(value)}
            value={cardNumber}
            style={styles.input}
          />
        </View>
        <View style={styles.alignInRow}>
        <View style={[styles.inputContainer, styles.secretCodeContainer]}>
            <Ionicons name="lock-closed" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Secret Code"
              autoCapitalize="none"
              onChangeText={value => setSecretCode(value)}
              value={secretCode}
              style={styles.input}
            />
          </View>
          <View style={[styles.inputContainer, styles.expiringDateContainer]}>
            <Ionicons name="calendar" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Expiration Date"
              autoCapitalize="none"
              onChangeText={value => setExpirationDate(value)}
              value={expirationDate}
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {handleBuyToCreateChat();handleUpdateKiloBuy()}} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Oui je paye</Text>
        </TouchableOpacity>
      </View>
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
  containerCard: {
    width: '100%',
    height: '50%',
    backgroundColor: '#FAFAFBFF',
    borderRadius: 4,
    shadowColor: '#171a1f',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    padding: 20,
  },
  alignInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
  },
  secretCodeContainer: {
    width:"40%",
    marginRight: 10,
  },
  expiringDateContainer: {
    width:"57%",
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 10,
  },
  textButton: {
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
});
