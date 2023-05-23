import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';



export default function BuyScreen({ route }) {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState()
  const [cardholderName, setCardholderName] = useState()
  const [secretCode, setsecretCode] = useState()
  const [result, setResult] = useState('')

 // Juste une précision sur qui est qui 
  const userOne = useSelector(state => state.user)
  console.log('buyScreen route:', route);
  const { flightId, kilo, user, date } = route.params;

  if (!flightId) {
    // Traitez le cas où la propriété 'flightId' est manquante ou indéfinie
    return (
      <View style={styles.container}>
        <Text>Erreur: flightId est manquant</Text>
      </View>
    );
  }


  // route post chats pour créer un lien entre le user 1 et 2
  const handleBuyToCreateChat = () => {
      const requestBody = {
        token: userOne.token,
        username: userOne.username,
        date: userOne.date,
        objectId: flightId,
        //Le deuxième username 
        usernameTwo: user,
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
          
        })
        .catch(error => {
          setResult(`Error: ${error}`);
          console.log(error);
        });
  }

  return (
<View style={styles.container}>
    <View style={styles.containerCard}>
      
    <Text>Order Summary</Text>
    <Text>Flight ID: {flightId}</Text>
      <Text>Payer les {kilo} Kg</Text>
      <Text>Pour le {date}</Text>

      <Text>Payment details</Text>
      <TextInput
          placeholder="Cardholder Name"
          autoCapitalize="none"
          onChangeText={(value) => setCardNumber(value)}
          value={cardNumber}
          style={styles.input}
      />
      <View style={styles.alignInRow}>       
        <View style={styles.itemBox}>
          <TextInput
              placeholder="CardNumber"
              autoCapitalize="none"
              onChangeText={(value) => setCardNumber(value)}
              value={cardNumber}
              style={styles.input}
              />
        </View>
        <Text>Séparer</Text>
      <View style={styles.itemBox}>
          <TextInput
          placeholder="Secret Code"
          autoCapitalize="none"
          onChangeText={(value) => setCardNumber(value)}
          value={cardNumber}
          style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleBuyToCreateChat()
      } style={styles.button} activeOpacity={0.8} >
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
    width: "100%",
    height: "50%",
    backgroundColor: '#FAFAFBFF', // neutral-100
    borderRadius: 4, // border-m
    shadowColor: '#171a1f',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
  alignInRow : {
    display: "flex",
    flexDirection: "row",
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
});
