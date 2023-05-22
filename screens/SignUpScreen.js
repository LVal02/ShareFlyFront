import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  addToken,
  updateUsername,
  updateFirstname,
  updateLastname,
} from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const user = useSelector((state) => state.user.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const navigation = useNavigation();
  //Ici Pour le SignUp

  const handleSignUp = () => {
    fetch("https://share-fly-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addToken(data.token));
          dispatch(updateUsername(username));
          dispatch(updateFirstname(firstname)); // Mettre à jour le firstname dans le reducer
          dispatch(updateLastname(lastname)); // Mettre à jour le lastname dans le reducer
    
          navigation.navigate("TabNavigator", { screen: "FlightBoard" });
        } else {
          setError(data.form);
          console.log(error);
          setErrorMessage("Invalid input or already taken"); // Mise à jour de la variable d'état avec le message d'erreur
        }
      })
      .catch((error) => {
        console.log("Error:", error); // Affichage de l'erreur dans la console
        setErrorMessage("An error occurred. Please try again."); // Mise à jour de la variable d'état avec le message d'erreur
      });
  };

  return (
      <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Create your account</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            autoCapitalize="words"
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={styles.input}
          />
          <TextInput
            placeholder="First Name"
            autoCapitalize="words"
            onChangeText={(value) => setFirstName(value)}
            value={firstname}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            autoCapitalize="words"
            onChangeText={(value) => setLastName(value)}
            value={lastname}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Submit</Text>
          </TouchableOpacity>
          {errorMessage && (
            <Text className={styles.errorMessage}>{errorMessage}</Text>
          )}
          {/* Affichage du message d'erreur s'il y en a un */}
        </View>
      </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 50,
    marginBottom: 100,
    fontWeight: 600,
    textAlign: "center", 
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  input: {
    width: 200,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 5,
    fontSize: 20,
    color: "#000000",
  },
  button: {
    alignItems: "center",
    padding: 4,
    width: 200,
    marginTop: 30,
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
});
