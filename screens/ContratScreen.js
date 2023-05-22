import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Alert } from 'react-native';

export default function ContratScreen({ route }) {
  const navigation = useNavigation();
  const userName = useSelector(state => state.user.username);
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log('Contrat user:', userName);

//Déstructuration des éléments reçus par le flightBoard
  const { flightId, kilo, user, date } = route.params;
  console.log('Contrat route:', route);

  if (!flightId) {
    // Le cas où la propriété 'flightId' est manquante ou indéfinie
    return (
      <View style={styles.container}>
        <Text>Erreur: flightId est manquant</Text>
      </View>
    );
  }

  const handleCheckbox1Change = () => {
    setIsCheckbox1Checked(!isCheckbox1Checked);
  };
  
  const handleCheckbox2Change = () => {
    setIsCheckbox2Checked(!isCheckbox2Checked);
  };

  const handlePayment = () => {
    if (isCheckbox1Checked && isCheckbox2Checked) {
      // Les deux conditions ont été validées, il peut donc naviguer vers le paiement
      console.log('Contrat accepté !');
      navigation.navigate('Buy', {
        flightId: flightId,
        date: date,
        kilo: kilo,
        user: user,
      });
    } else {

      console.log('Veuillez cocher toutes les cases avant de procéder au paiement.');
      setErrorMessage('Veuillez cocher toutes les cases avant de procéder au paiement.');

    //   Fait apparaitre une popUp dans l'écran
    //   Alert.alert('Erreur', 'Veuillez cocher toutes les cases avant de procéder au paiement.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Flight ID: {flightId}</Text>
      <Text>
        Je soussigné, <Text style={{ fontWeight: 'bold' }}>{userName}</Text>, déclare avoir pris connaissance du 
        contrat avec le prestataire <Text style={{ fontWeight: 'bold' }}>{user}</Text>
      </Text>
      <TouchableOpacity onPress={handleCheckbox1Change}>
        <View
            style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderColor: isCheckbox1Checked ? '#ddd' : '#000',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isCheckbox1Checked ? '#00CC00' : 'transparent',
            }}
        >
            {isCheckbox1Checked && <Icon name="check" size={18} color="#fff" />}
        </View>
      </TouchableOpacity>

      <Text>Je garantie que je serai présent</Text>
      <Text>pour le vol du <Text style={{ fontWeight: 'bold' }}>{date}</Text></Text>
      <TouchableOpacity onPress={handleCheckbox2Change}>
        <View
            style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderColor: isCheckbox2Checked ? '#ddd' : '#000',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isCheckbox2Checked ? '#00CC00' : 'transparent',
            }}
        >
            {isCheckbox2Checked && <Icon name="check" size={18} color="#fff" />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePayment} style={styles.button} activeOpacity={0.8}>
      {errorMessage && <Text>{errorMessage}</Text>}
        <Text style={styles.textButton}>J'accepte toute les conditon précédentes</Text>
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
