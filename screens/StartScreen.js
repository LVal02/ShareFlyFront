import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUsername,
  addToken,
  updateDate,
  updateFlyNumber,
  updateFlightObjectId,
} from "../reducers/user";

import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { colors } from 'debug/src/browser';

import { buildUnavailableHoursBlocks } from "react-native-calendars/src/timeline/Packer";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function StartScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isTextVisible, setTextVisibility] = useState(1);


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (email) {
      navigation.navigate("TabNavigator", { screen: "Submission" });
    }
  }, []);

  const disapear = () => {
    setTextVisibility(isTextVisible * -1);
    console.log(isTextVisible) 
    console.log(isTextVisible == true) 
  }
  const handleSubmit = () => {
    //le signUp classique 
    if (EMAIL_REGEX.test(email)) {
      fetch("https://share-fly-backend.vercel.app/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addToken(data.token));
            dispatch(updateUsername(data.username));
            //On veut récupérer l'objectId de vol
            const objetRequest = { token: data.token, username: data.username }
            console.log("ça passe ici objetRequest:", objetRequest);
            fetch("https://share-fly-backend.vercel.app/flights", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(objetRequest),
            })
            .then((response) => response.json())
            .then((dataFlight) => {
              console.log("ça passe aussi ici");
              if (dataFlight) {
                console.log(dataFlight);
                // Je trouve pas de vol 

                // const [ _id, flyNumber, date ] = dataFlight.data[0]  
                // dispatch(updateFlightObjectId(_id))
                // dispatch(updateFlyNumber(flyNumber))
                // dispatch(updateDate(date))
                
               navigation.navigate("TabNavigator", { screen: "Home" });
              }
            })
          } else {
            setErrorMessage("Invalid email or password");
            navigation.navigate("TabNavigator", { screen: "Home" });
          }
        });
    } else {
      setErrorMessage(true);
    }
  };

  // C'est le boutton qui auto "login" Je l'ai mis en place pour gagner du temps
  const autoLogin = () => {
    dispatch(addToken("IjY0bA1PT-shvwqTZRKculkRbP3atUU-"));
    dispatch(updateUsername("Dev"));
    dispatch(updateDate("2023-05-01"));
    dispatch(updateFlyNumber("OZ110"));
    dispatch(updateFlightObjectId("646799ec255394f2222b4d41"));
    navigation.navigate("TabNavigator", { screen: "Home" });
  };
  const autoLogin2 = () => {
    dispatch(addToken("jJCTNkYXC5MxlG2LoStA8ycZQTUf9ypw"));
    dispatch(updateUsername("Deivi"));
    dispatch(updateDate("2023-05-01"));
    dispatch(updateFlyNumber("OZ110"));
    dispatch(updateFlightObjectId("646799ec255394f2222b4d41"));
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => autoLogin()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>AutoLogin noFetch Token+username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => autoLogin()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>AutoLogin2 noFetch Token+username</Text>
      </TouchableOpacity>
      {isTextVisible == true && (
        <View style = {styles.titre}>
        <FontAwesome name="plane" size={50} color="#112f5b" style={styles.logo}/>
        <Text style={styles.title}>
          Welcome to ShareFly
        </Text>
        </View>
      )}
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      > */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8f9094"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            onChangeText={(value) => setEmail(value)}
            // onTouchStart={() => disapear()}
            // onBlur={() => disapear()}
            
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8f9094"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
            // onTouchStart={() => disapear()}
            // onBlur={() => disapear()}
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.iconButton}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {errorMessage && (
            <Text style={styles.error}>Invalid email address</Text>
          )}
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.logInbutton}
            activeOpacity={0.8}
          >
            <Text style={styles.logIntextButton}>Log In</Text>
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Snap")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Go To Snap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FlightBoard")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Annonce Ici, A déplacer quand FlightSub sera finit
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  logo: {
  // backgroundColor: 'red',
  paddingRight: 2,
  },
  title: {
    fontSize: 50,
    fontWeight: "600",
    color: "#000000",
    alignItems: "center",
    textAlign: "center", 
  marginBottom: 40,   
  },
  titre: {
    flexDirection: "row",
    marginRight: 30
  },
  inputContainer: {
    padding: 30,
    borderRadius: 10,
    width: 350

  },
  input: {
    width: "100%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 20,
    paddingVertical: 5,
    color: "black",
  },
  iconButton: {
    position: "absolute",
    top: 85,
    right: 20,
  },
  logInbutton: {
    alignItems: "center",
    padding: 4,
    width: "100%",
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
  button: {
    alignItems: "center",
    padding: 5,
    width: "90%",
    marginTop: 30,
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius: 10,
  },
  logIntextButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 5,
    alignItems: "center",
    color: "rgb(237,237,237)",
  },
  textButton: {
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 5,
    alignItems: "center",
    color: "#112f5b",
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
