import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function BuyScreen() {

  return (
    <View style={styles.container}>
        <Text>Ici on buy</Text>
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
