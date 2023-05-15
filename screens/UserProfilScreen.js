import { StyleSheet, Text, View } from 'react-native';

export default function UserProfilScreen() {
    
//L'utilisateur peut voir son profil 

  return (
    <View style={styles.container}>
        <Text>Son profil</Text>
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