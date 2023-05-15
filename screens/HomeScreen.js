import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    
//L'utilisateur met ses identifiants

  return (
    <View style={styles.container}>
        <Text>Tout les logins</Text>
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
  