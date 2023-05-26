import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  const [kilo, setKilo] = useState("");
  const [result, setResult] = useState("");

  const [annonceKilo, setAnnonceKilo] = useState([]);
  const [annonceOpen, setAnnonceOpen] = useState([]);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputKilo, setInputKilo] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState({});

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

  const handleChooseFlightKilo = () => {
    if (selectedItem !== null) {
      setModalVisible(false);
      setSecondModalVisible(true);
    }
  };
  const handleReturnKiloToFlight = () => {
    if (selectedItem !== null) {
      setModalVisible(true);
      setSecondModalVisible(false);
    }
  };
  const handleConfirmKilo = () => {
    if (selectedItem !== null) {
      const selectedItemData = user.flights[selectedItem];
      console.log("selectedItemData", selectedItemData);

      const requestBody = {
        token: user.token,
        flyNumber: selectedItemData.flyNumber,
        date: selectedItemData.date,
        kilo: inputKilo,
        username: user.username,
        objectId: selectedItemData.flightObjectId,
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
      setInputModalVisible(false);
    }
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
          <Text style={styles.containerHeader}>
            Fly Number: {annonce.flyNumber}
          </Text>
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
  const handleItemPress = (index) => {
    setSelectedItem(index);
    setSelectedItemData(user.flights[index]);
  };

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.container}
      overScrollMode="always"
    >
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
              <ScrollView contentContainerStyle={styles.modalContent}>
                {user.flights.map((oneFlight, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.item,
                      selectedItem === index && styles.selectedItem,
                    ]}
                    onPress={() => {
                      // console.log(index);
                      handleItemPress(index);
                    }}
                  >
                    <Text>{oneFlight.flyNumber}</Text>
                    <Text>{oneFlight.date}</Text>
                    <Text>{oneFlight.flightObjectId}</Text>
                  </TouchableOpacity>
                ))}
                {/* {selectedItem && ( */}
                <Text style={styles.selectedText}>
                  Selected flyNumber: {selectedItemData.flyNumber}
                </Text>
                {/* // )} */}
                {/* {selectedItem && ( */}
                <Text style={styles.selectedText}>
                  Selected date: {selectedItemData.date}
                </Text>
                {/* // )} */}
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleModalClose}
                  style={styles.returnButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Return</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleChooseFlightKilo}
                  style={styles.confirmButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={secondModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSecondModalVisible(false)}
        >
          {/* deuxième modal  */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Contenu de la deuxième modal</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleReturnKiloToFlight}
                  style={styles.returnButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Return</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirmKilo}
                  style={styles.confirmButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
              </View>
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
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    // minHeight: "10%",
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
  selectedItem: {
    backgroundColor: "#f0f0f0",
  },
  selectedText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#e8be4b",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#e8be4b",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
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
