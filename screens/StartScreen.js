import React, { useEffect, useState } from 'react';
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
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { updateUsername, addToken, updateDate, updateFlyNumber } from '../reducers/user';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function StartScreen() {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (email) {
      navigation.navigate('TabNavigator', { screen: 'Submission' });
    }
  }, []);

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
        fetch('https://share-fly-backend.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password}),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(addToken(data.token))
                    dispatch(updateUsername(data.username))
                    navigation.navigate('TabNavigator', { screen: 'Home' });
                }else {
                    setErrorMessage('Invalid email or password');
                  }
                })
    } else {
      setErrorMessage(true);
    }
  };
// C'est le boutton qui auto "login" Je l'ai mis en place pour gagner du temps
  const autoLogin = () => {
    dispatch(addToken("IjY0bA1PT-shvwqTZRKculkRbP3atUU-"))
    dispatch(updateUsername("Dev"))
    dispatch(updateDate("2023-05-01"))
    dispatch(updateFlyNumber("OZ110"))
    navigation.navigate('TabNavigator', { screen: 'Home' });
  }



  return (
    <ImageBackground source={require('../assets/flight.jpg')} style={styles.background}>
          <TouchableOpacity onPress={() => autoLogin()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>AutoLogin noFetch Token+username</Text>
          </TouchableOpacity>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>ShareFly</Text>

        <View style={styles.inputContainer}>
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
                placeholder="Mot de passe"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={styles.input}
            />
          <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.iconButton}>
            <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="black"/>
          </TouchableOpacity>
              {errorMessage && <Text style={styles.error}>Invalid email address</Text>}
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')
            } style={styles.button} activeOpacity={0.8} >
        <Text style={styles.textButton}>Inscription</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Snap')
          } style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Go To Snap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FlightBoard')
            } style={styles.button} activeOpacity={0.8} >
          <Text style={styles.textButton}>Annonce Ici, A déplacer quand FlightSub sera finit</Text>
        </TouchableOpacity>


      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 190, 11, 0.4)'
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 20
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
    borderRadius: 10,
  },
  textButton: {
    // fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  text: {
    // Styles pour le texte utilisateur
  },
});
