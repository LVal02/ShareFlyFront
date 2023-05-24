import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Modal, SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function FlightBoardScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  console.log("flightBoardScreen user:", user);

  const dataKilo = [
    {
      _id: "64639b67a2c70f4fdfc7ffca",
      flight: "555XXX",
      kilo: "10",
      user: "Franc",
      __v: 3,
    },
    {
      _id: "165165q4s89f48qs16161sd1",
      flight: "555XXX",
      kilo: "50",
      user: "Max",
      __v: 3,
    },
  ];

  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState("");

  const [annonceKilo, setAnnonceKilo] = useState([]);
  const [annonceOpen, setAnnonceOpen] = useState([]);


  // useEffect(() => {
  //     const requestBodyFetchKilo = {
  //       token: user.token,
  //       username: user.username,
  //     };
  
  //     console.log("requestBodyFetchKilo", requestBodyFetchKilo);
  
  //     fetch("http://localhost:3000/index/kilos/all", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(requestBodyFetchKilo),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //   });
  // }, []);

  useEffect(() => {
    console.log(user.flights.length);
    user.flights.map((flight) => {
      const requestBodyFetchKilo = {
        token: user.token,
        username: user.username,
        flight: flight.flightObjectId,
      };
  
      console.log("requestBodyFetchKilo", requestBodyFetchKilo);
  
      fetch("http://192.168.110.74:3000/index/kilos/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBodyFetchKilo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("kilos/all data:", data);
          if (data.result) {
            setAnnonceKilo((arrayAnnonceKilo) => [...arrayAnnonceKilo, data]);
          } else {
            setErrorMessage("No Annonce found");
            console.log(data.errorMessage);
            //Bha du coup on envoie
            // setAnnonceKilo((arrayAnnonceKilo) => [...arrayAnnonceKilo, dataKilo]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  

  const handleAddKilo = () => {
    const requestBody = {
      token: user.token,
      flyNumber: user.flyNumber,
      date: user.date,
      kilo: kilo,
      username: user.username,
      objectId: user.flightObjectId,
    };
    console.log("requestBody:", requestBody);
    // AJOUTER DES KILOS ICI
    fetch("https://share-fly-backend.vercel.app/kilos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        setResult(
          data.result ? "Kilo added successfully" : `Error: ${data.error}`
        );
      })
      .catch((error) => {
        setResult(`Error: ${error}`);
        console.log(error);
      });
  };

  // console.log("annonceKilo",annonceKilo);
  let kilosAnnonce;
  kilosAnnonce = annonceKilo?.map((annonce, index) => {
    // console.log("annonceKilo?.map((annonce :", annonce);
    return (
      <View key={index}>
        
        <TouchableOpacity
          style={styles.annoncesHeader}
          onPress={() => {
            const updatedAnnonceOpen = [...annonceOpen];
            updatedAnnonceOpen[index] = !updatedAnnonceOpen[index];
            setAnnonceOpen(updatedAnnonceOpen);
          }}
        >
          
          <Text style={styles.containerHeader}>Fly Number: {annonce.flyNumber}</Text>
          <Text style={styles.containerHeader}>Date: {annonce.date}</Text>
          
        </TouchableOpacity>
        {annonceOpen[index] && ( // Vérifier si l'annonce est ouverte
          <View>
            {annonce.data.map((item, itemIndex) => (
              <TouchableOpacity
                style={styles.flightItem}
                key={itemIndex}
                onPress={() =>
                  navigation.navigate("Contrat", {
                    kiloId: item.kiloId,
                    date: annonce.date,
                    kilo: item.kilo,
                    username: item.username,
                    flyNumber: annonce.flyNumber,
                    flightId: item.flightId,
                  })
                }
              >
                <Text>Kilo: {item.kilo}</Text>
                <Text>Username: {item.username}</Text>
                <View style={[styles.dropdownContent]}>
                  {/* <TouchableOpacity
                    style={styles.buttonBuy}
                    onPress={() =>
                      navigation.navigate("Contrat", {
                        kiloId: item.kiloId,
                        date: annonce.date,
                        kilo: item.kilo,
                        user: item.username,
                      })
                    }
                    activeOpacity={0.8}
                  > */}
                    <Text>Buy</Text>
                  {/* </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  });
  
  

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.container} overScrollMode="always">
      
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.square}
        activeOpacity={0.8}
      >
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter kilo"
              onChangeText={(value) => setKilo(value)}
              value={kilo}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleAddKilo}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleModalClose}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.result}>{result}</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {kilosAnnonce}
       </ScrollView>
      {/* {annonceKilo && (<Text>{errorMessage}</Text>) } */}
    </View>
    </ScrollView>
    // </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
  containerHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#e8be4b",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dropdownContent: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBuy: {
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 25,
    marginTop: 10,
  },
  buyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
