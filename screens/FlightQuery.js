import { StyleSheet, Text, View } from 'react-native';

export default function FlightQuery() {

//Ici l'utilisateur mettra son n° et la date du vol

  return (
    <View style={styles.container}>
      <Text>L'utilisateur met ses donnée ici</Text>
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
