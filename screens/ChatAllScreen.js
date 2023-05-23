import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ChatAllScreen() {
    
    //Un fetch de tout les message ici pls

    const handleChatNavigate = () => {
        navigation.navigate("TabNavigator", { screen: "Chat", params:{
            token: user.token,
            usernameTwo: usernameTwo,
            flyNumber: user.flyNumber,
            date: user.date,
            username: user.username,
          }}
          )
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Chat</Text>
        <TouchableOpacity
            onPress={handleChatNavigate(idChat)}
            style={styles.button}
            activeOpacity={0.8}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#075e54',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeText: {
    fontSize: 12,
    color: '#888888b',
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#ffffff',
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    padding: 8,
    width: 200,
    marginTop: 30,
    backgroundColor: '#4941B7',
    opacity: 0.7,
    borderRadius: 10,
  },
});
