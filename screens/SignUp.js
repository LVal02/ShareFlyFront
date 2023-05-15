import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { addToken } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const user = useSelector(state => state.user.token )
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [username, setUsername] = useState ('')
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch()
    
  const navigation = useNavigation()
    //Ici Pour le SignUp

    //Vérification des champs de saisie
    //Un email valide
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //Validation d'au moins une lettre
    const validateName = (name) => /^[A-Za-z]{1,}$/.test(name);
    
    //Validation du mot de passe qui contient au moins un charactere spécial, une maj et une longueur de plus de 8
    // const validatePassword = (password) => /^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/.test(password);
    const validatePassword = (password) => password.length >= 8;
    const validateForm = () => validateEmail(email) && validateName(firstname)&& validateName(username) && validateName(lastname) && validatePassword(password);
    
    const handleSignUp = () => {
        if (validateForm()) {
            fetch('https://share-fly-backend.vercel.app/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, username: username, password: password, firstname: firstname, lastname: lastname }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(addToken({ token: data.token }))
                        console.log(user);
                        navigation.navigate('TabNavigator', { screen: 'Submission' });
                    }else {
                        setErrorMessage('Invalid input or already'); // Mise à jour de la variable d'état avec le message d'erreur
                      }
                    })
        } else {
            setErrorMessage('Champs de saisi manquant ou invalide'); 
        }
      };    

  return (
    <View style={styles.container}>
        <Text>SignUpScreen</Text>
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
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
        />
        <TextInput
            placeholder="Username"
            autoCapitalize="words"
            secureTextEntry={true}
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={styles.input}
        />
        <TextInput
            placeholder="Firstname"
            autoCapitalize="words"
            onChangeText={(value) => setFirstName(value)}
            value={firstname}
            style={styles.input}
        />
        <TextInput
            placeholder="Lastname"
            autoCapitalize="words"
            onChangeText={(value) => setLastName(value)}
            value={lastname}
            style={styles.input}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
        {errorMessage && <Text className={styles.errorMessage}>{errorMessage}</Text>}{/* Affichage du message d'erreur s'il y en a un */}
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
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
