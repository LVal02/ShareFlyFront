import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground } from 'react-native';
// import DatePicker from 'react-native-date-picker'  // Sera peut être mis en place si le temps le nous permet pour l'idée C'est d'avoir un calendrier glissable
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { updateDate, updateFlightObjectId, updateFlyNumber } from '../reducers/user';


// import DateInline from './TestDate';

export default function FlightSubmissionScreen() {
  // const [date, setDate] = useState(new Date())
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const navigation = useNavigation();

  const [flyNumber, setFlyNumber] = useState()
  const [userUser, setUserUser] = useState()
  const [dateInputed, setDateInputed] = useState()

  const [error, setError] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

console.log('flightSubmissionScreen user:',user);

//Ici l'utilisateur mettra son n° et la date du vol
const handleSubmitFlight = () => {
  fetch("https://share-fly-backend.vercel.app/flights/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      flyNumber: flyNumber,
      token: user.token,
      date: dateInputed,
      username: user.username,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
      if (data.result) {
        // console.log("data.rsult",data.result);
        dispatch(updateFlyNumber(flyNumber))
        dispatch(updateDate(dateInputed))
        dispatch(updateFlightObjectId(data.objectId))
        // navigation.navigate('FlightBoard')
        // navigation.navigate('TabNavigator', { screen: 'Home' });
      } else {
        setError(data.error); // Update the error state with the specific error message
        if(data.error == "Flight already exists"){
          fetch("https://share-fly-backend.vercel.app/flights/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              objectId: data.flight,
              token: user.token,
              username: user.username,
            }),
          })
          .then((response) => response.json())
          .then((dataFlightAdd) => {
            console.log("/flights/add dataFlightAdd:",dataFlightAdd);
            dispatch(updateFlightObjectId(data.flight))
          })
        }
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
      <Text style={styles.user}>Welcome {user.username}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.tag}>Add your flight information</Text>
        {/* <DatePicker date={date} onDateChange={setDate} /> */}
        <TextInput
          placeholder="Flight Number"
          autoCapitalize="none"
          onChangeText={(value) => setFlyNumber(value)}
          value={flyNumber}
          style={styles.input}
        />

        <TextInput
          placeholder="YYYY-MM-DD"
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
  user:{
    fontSize: 40,
    fontWeight: 500,
  },
  tag: {
    fontSize: 17,
    fontWeight: 300,
    marginBottom: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '85%',
    padding: 30,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 5,
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    padding: 4,
    backgroundColor: "#4E3BBE",
    opacity: 0.9,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  textButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 5,
    alignItems: "center",
    color: "rgb(237,237,237)",
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  calendarContainer: {
    marginTop: 20,
    opacity: 0.8,
    width: '80%',
    height: '30%',

  },
});