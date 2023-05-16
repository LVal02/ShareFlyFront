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
import { updateUsername } from '../reducers/user';

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function HomeScreen() {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
                    dispatch(addToken({ token: data.token }))
                    console.log(user);
                    navigation.navigate('TabNavigator', { screen: 'Submission' });
                }else {
                    setEmailError('Invalid input or already'); // Mise à jour de la variable d'état avec le message d'erreur
                  }
                })
    } else {
      setEmailError(true);
    }
  };

  return (
    <ImageBackground source={require('../assets/flight.jpg')} style={styles.background}>
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
          {emailError && <Text style={styles.error}>Invalid email address</Text>}
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')
            } style={styles.button} activeOpacity={0.8} >
        <Text style={styles.textButton}>Inscription</Text>
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
    borderRadius: 1,
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
