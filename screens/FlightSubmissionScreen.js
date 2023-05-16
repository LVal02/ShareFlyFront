import { StyleSheet, Text, View, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// import DateInline from './TestDate';

export default function FlightSubmissionScreen() {

  const [date, setDate] = useState(new Date())

  const [flynumber, setFlynumber] = useState()
  const [email, setEmail] = useState()
  const [dateInputed, setDateInputed] = useState()

  const user = useSelector(state => state.user)
  console.log(user.username);



//Ici l'utilisateur mettra son n° et la date du vol
const handleSubmitFlight = () => {
  fetch("https://share-fly-backend.vercel.app/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      flynumber: flynumber,
      user: user,
      date: dateInputed,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        console.log(data)
        navigation.navigate("TabNavigator", { screen: "Submission" });
      } else {
        // setError(data.form);
        // Les fields qui ne passe pas la fonction validateForm sont saved dans error (je vais creer une condition plus tard pour changer les border #Léo)
        console.log(error);
        setErrorMessage("Invalid input or already"); // Mise à jour de la variable d'état avec le message d'erreur
      }
    });
  setErrorMessage("Champs de saisi manquant ou invalide");
};


return (
  <View style={styles.container}>
  <Text>Bienvenue {user.username}</Text>
      <Text>Mets tes données ici</Text>
      {/* <DatePicker date={date} onDateChange={setDate} /> */}
      <TextInput
        placeholder="Flynumber"
        autoCapitalize="words"
        onChangeText={(value) => setFlynumber(value)}
        value={flynumber}
        style={styles.input}
      />
            <TextInput
        placeholder="Email"
        autoCapitalize="words"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
      />
            <TextInput
        placeholder="Date"
        autoCapitalize="words"
        onChangeText={(value) => setDateInputed(value)}
        value={dateInputed}
        style={styles.input}
      />
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
  input: {
    width: 200,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
