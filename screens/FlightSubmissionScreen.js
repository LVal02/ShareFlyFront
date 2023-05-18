import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
// import DatePicker from 'react-native-date-picker'  // Sera peut être mis en place si le temps le nous permet pour l'idée C'est d'avoir un calendrier glissable
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { updateDate, updateFlyNumber } from '../reducers/user';


// import DateInline from './TestDate';

export default function FlightSubmissionScreen() {
  // const [date, setDate] = useState(new Date())
  const dispatch = useDispatch()
  
  const navigation = useNavigation();

  const [flyNumber, setFlyNumber] = useState()
  const [userUser, setUserUser] = useState()
  const [dateInputed, setDateInputed] = useState()

  const [error, setError] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector(state => state.user)
console.log('flightSubmissionScreen user:',user);

//Ici l'utilisateur mettra son n° et la date du vol
const handleSubmitFlight = () => {
  fetch("https://share-fly-backend.vercel.app/flights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      flyNumber: flyNumber,
      token: user.token,
      date: dateInputed,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
      if (data.result) {
        console.log(data);
        dispatch(updateFlyNumber(flyNumber))
        dispatch(updateDate(dateInputed))
        navigation.navigate('FlightBoard')
        // navigation.navigate('TabNavigator', { screen: 'Home' });
      } else {
        setError(data.error); // Update the error state with the specific error message
        setErrorMessage("Invalid input or already added");
      }
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("Error creating flight");
    });
};

const handleDatePress = (day) => {
  const selectedDate = day.dateString;
  setDateInputed(selectedDate);
};

return (
  <View style={styles.container}>
      <Text>Bienvenue {user.username}</Text>
    <View style={styles.inputContainer}>  
      <Text>Mets tes données ici</Text>
      {/* <DatePicker date={date} onDateChange={setDate} /> */}
      <TextInput
        placeholder="Flynumber"
        autoCapitalize="none"
        onChangeText={(value) => setFlyNumber(value)}
        value={flyNumber}
        style={styles.input}
        />
        
      <TextInput
        placeholder="AAAA-MM-jj"
        autoCapitalize="none"
        onChangeText={(value) => setDateInputed(value)}
        value={dateInputed}
        style={styles.input}
        />
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <TouchableOpacity onPress={() => handleSubmitFlight()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Submit</Text>
          </TouchableOpacity>
    </View>
      <View style={styles.calendarContainer}>
        <Calendar onDayPress={handleDatePress} />

      </View>
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
});
