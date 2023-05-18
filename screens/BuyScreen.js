import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function BuyScreen({ route }) {
  console.log('buyScreen route:', route);

  const { flightId } = route.params;

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
      <Text>Ici on sort sa carte</Text>
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
