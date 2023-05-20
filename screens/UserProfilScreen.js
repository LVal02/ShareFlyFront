import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserProfilScreen() {
  const username = useSelector((state) => state.user.username);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);

  return (
    <ImageBackground source={require('../assets/flight1.jpg')} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <FontAwesome name="user-circle-o" style={styles.profileIcon} />
        <Text style={styles.profileUsername}></Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Firstname:</Text>
        <Text style={styles.value}>{firstname}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Lastname:</Text>
        <Text style={styles.value}>{lastname}</Text>
      </View>
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
    justifyContent: 'flex-start',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 80,
    marginRight: 10,
    color: '#333',
  },
  profileUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 20,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#666',
  },
});
