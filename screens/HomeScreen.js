import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/flight1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FlightSubmission')} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Je veux enregistrer mon N° de Vol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FlightBoard')} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Regarder les annonces de kilos selon votre N° de vol et date</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: '600',
    marginBottom: 200,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 10,
  },
  textButton: {
    height: 50,
    fontWeight: '600',
    fontSize: 16,
    paddingTop: 5,
    alignItems: 'center',
  textAlign: 'center',
  opacity: 1,
  },
});
