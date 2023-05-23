import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Modal, SafeAreaView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function FlightBoardScreen() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  console.log('flightBoardScreen user:', user);

  const dataKilo = [
    {_id: '64639b67a2c70f4fdfc7ffca',flight: '555XXX',kilo: '10',user: 'Franc',__v: 3
    },
    {_id: '165165q4s89f48qs16161sd1',flight: '555XXX',kilo: '50',user: 'Max',__v: 3
    }
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [kilo, setKilo] = useState('');
  const [result, setResult] = useState('');

  const [annonceKilo, setAnnonceKilo] = useState(null);
  
  // Ici Tout la partie qui va gérer le fetch dans un useEffect 
  
  const [posts, setPosts] = useState([]);
  const [dataResult, setDataResult] = useState("");

  const fetchData = async () => {
    try {
      const url = 'https://share-fly-backend.vercel.app/kilos/all';
      const requestBodyFetchKilo = {
        token: user.token,
        flyNumber: user.flyNumber,
        date: user.date,
        flight: user.flightObjectId,
        username: user.username
      };
      console.log("requestBodyFetchKilo",requestBodyFetchKilo);
      const response = await axios.post(url, requestBodyFetchKilo);
      const data = response.data;
      console.log("data",data);
      if (data.result === false) {
        setDataResult("fail");
        //Dummy Data
        setPosts(dataKilo);
      } else {
        setDataResult("true");
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
      setDataResult("fail");
      //DummyData
      setPosts(dataKilo);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // if (dataResult === "true") {
      // Créer un tableau d'objets Animated.Value pour gérer l'animation de chaque message
      const animatedValues = posts?.map(() => new Animated.Value(0));

      const toggleMessage = (index) => {
        // Basculer l'index du message actuellement étendu
        setExpandedIndex(expandedIndex === index ? null : index);
      };

      const renderMessage = (post, index) => {
        const isExpanded = expandedIndex === index;

        // Définir l'animation de la hauteur du message en fonction de l'état d'expansion
        const messageHeight = animatedValues[index]?.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 250],
        });

        return (
          <TouchableOpacity key={index} onPress={() => toggleMessage(index)}>
            <Animated.View
              style={[
                styles.itemContainer,
                { height: isExpanded ? messageHeight : 60 },
              ]}
            >
              <Text style={styles.text}>Titre : {post.title}</Text>
              {isExpanded && (
                <Animated.Text style={[styles.text, { height: messageHeight }]}>
                  Contenu : {post.body}
                </Animated.Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      };

      // Créer un tableau d'animations pour chaque message
      const animations = animatedValues?.map((value) => {
        return Animated.timing(value, {
          toValue: expandedIndex !== null ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        });
      });

      // Lancer les animations en parallèle
      Animated.parallel(animations).start();

      return () => {
        // Nettoyer les animations lors de la suppression du composant
        animations.forEach((animation) => animation.stop());
      };
    // }
  }, [dataResult, expandedIndex, posts]);


  // useEffect(() => {

  //   const resquestBodyFetchkilo = {
  //     flyNumber: user.flyNumber,
  //     date: user.date,
  //     token: user.token,
  //     username: user.username,
  //   }
  //   console.log("resquestBodyFetchkilo",resquestBodyFetchkilo);
  //   fetch('https://share-fly-backend.vercel.app/kilos/all', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(resquestBodyFetchkilo),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data) {
  //         console.log('data', data);
  //         setAnnonceKilo(data);
  //       } else {
  //         setErrorMessage('No Annonce found');
  //         console.log(data.error);
  //         setAnnonceKilo(dataKilo)
  //       } cath
  //     });
  // }, []);


  const handleAddKilo = () => {
    const requestBody = {
      token: user.token,
      flyNumber: user.flyNumber,
      date: user.date,
      kilo: kilo,
      username: user.username,
      objectId: user.flightObjectId,
    };
    console.log('requestBody:', requestBody);
    
    // AJOUTER DES KILOS ICI
    fetch('https://share-fly-backend.vercel.app/kilos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server Response:', data);
        setResult(data.result ? 'Kilo added successfully' : `Error: ${data.error}`);
      })
      .catch(error => {
        setResult(`Error: ${error}`);
        console.log(error);
      });
  };

  // let kilosAnnonce;
  // kilosAnnonce = dataKilo?.map(annonce => {

  //   return (
  //     <TouchableOpacity
  //       style={styles.flightItem}
  //       // onPress={handleToggle}
  //       key={annonce._id}
  //     >
  //       <Text>Fly Number: {annonce.flight}</Text>
  //       <Text>Date: {user.date}</Text>
  //         <View style={[styles.dropdownContent]}>
  //           <View>
  //             <Text>Additional Content</Text>
  //             <Text>Additional Content</Text>
  //             <Text>Additional Content</Text>
  //           </View>
  //           <TouchableOpacity
  //             style={styles.buttonBuy}
  //             onPress={() =>
  //               navigation.navigate('Contrat', {
  //                 flightId: annonce._id,
  //                 date: user.date,
  //                 kilo: annonce.kilo,
  //                 user: annonce.user,
  //               })
  //             }
  //             activeOpacity={0.8}
  //           >
  //             <Text>Buy</Text>
  //           </TouchableOpacity>
  //         </View>
  //     </TouchableOpacity>
  //   );
  // });

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.square} activeOpacity={0.8}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={handleModalClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter kilo"
              onChangeText={value => setKilo(value)}
              value={kilo}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddKilo} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModalClose} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.result}>{result}</Text>
      {dataResult === "true" && posts && posts.length > 0 ? (
        <View>
          {posts.map((post, index) => renderMessage(post, index))}
        </View>
      ) : dataResult === "" ? (
        <Text style={styles.loadingText}>Chargement...</Text>
      ) : dataResult === "fail" ? (
        <Text style={styles.loadingText}>Échec du chargement</Text>
      ) : null}
      {/* {kilosAnnonce} */}
      {/* {annonceKilo && (<Text>{errorMessage}</Text>) } */}
      
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
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
  flightItem: {
    backgroundColor: '#e8be4b',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dropdownContent: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBuy: {
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 25,
    marginTop: 10,
  },
  buyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
