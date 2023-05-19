import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ShareFly Chat</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
        placeholder="Type a message..."
        showAvatarForEveryMessage
        renderUsernameOnMessage
        renderAvatarOnTop
        renderDay={null}
        timeTextStyle={styles.timeText}
        textInputStyle={styles.textInput}
        sendButtonProps={{ containerStyle: styles.sendButtonContainer }}
      />
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
});
