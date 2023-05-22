import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function BuyScreen({ route }) {
  const navigation = useNavigation();
  
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

  // Utilisez l'identifiant du vol comme bon vous semble dans votre composant BuyScreen

  return (
    <View style={styles.container}>
    <Text>Flight ID: {flightId}</Text>
      <Text>Payer les {kilo} Kg</Text>
      <Text>Pour le {date}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('FlightBoard')
            } style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Oui je paye</Text>
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
