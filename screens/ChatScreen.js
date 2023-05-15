import { StyleSheet, Text, View } from 'react-native';

export default function ChatScreen() {

  //Ici pour les toutes les annonces que l'utilisateur pourra mettre

  return (
    <View style={styles.container}>
      <Text>Le chat ici</Text>
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
