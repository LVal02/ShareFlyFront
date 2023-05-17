import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
    const navigation = useNavigation();
  //Ici pour les toutes les annonces que l'utilisateur pourra mettre

  return (
    <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FlightSubmission')
            } style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Je veux enregistrer mon N° de Vol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FlightBoard')
            } style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>regarder vos annonces Déjà Poster</Text>
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
  inputContainer: {
    width: '85%',
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 1,
  },
  input: {
    width: '100%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
    // fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
