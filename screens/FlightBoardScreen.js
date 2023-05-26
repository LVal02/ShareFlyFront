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

      fetch("http://192.168.10.182:3000/index/kilos/all", {
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
      <View key={index} style={styles.annoncesContainer}>
        <TouchableOpacity
          style={styles.annoncesHeader}
          onPress={() => {
            const updatedAnnonceOpen = [...annonceOpen];
            updatedAnnonceOpen[index] = !updatedAnnonceOpen[index];
            setAnnonceOpen(updatedAnnonceOpen);
          }}
        >
          <Text style={styles.containerHeader}>
            Annonce pour le vol: {annonce.flyNumber}
          </Text>
          <Text style={styles.containerHeader}>le {annonce.date}</Text>
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
      <View style={styles.containerAnnonce}>
        <View style={styles.containerAnnonceAjout}>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.rectangle}
          activeOpacity={0.8}
          >
          <Text style={styles.buttonText}>Ajouter une annonce</Text>
        </TouchableOpacity>
          </View>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleModalClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                <Text style={[styles.selectedText, styles.selectFlightText ]}>Select a flight</Text>
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
              <View style={styles.containerInputRow}>
              <TouchableOpacity
  style={[styles.buttonIcon, styles.leftButton]}
  onPress={() => setInputKilo((prevValue) => prevValue > 5 ? prevValue - 5 : 0)}
  activeOpacity={0.8}
>
  <FontAwesome name="angle-double-left" size={24} color="#000" />
</TouchableOpacity>

<TouchableOpacity
  style={[styles.buttonIcon,styles.leftButton]}
  onPress={() => setInputKilo((prevValue) => prevValue > 0 ? prevValue - 1 : 0)}
  activeOpacity={0.8}
>
  <FontAwesome name="angle-left" size={24} color="#000" />
</TouchableOpacity>

<TextInput
  style={styles.input}
  placeholder="Nombre de kilo à vendre"
  keyboardType="numeric"
  value={inputKilo.toString()}
  onChangeText={(text) => setInputKilo(parseInt(text, 10))}
/>

<TouchableOpacity
  style={[styles.buttonIcon,styles.rightButton]}
  onPress={() => setInputKilo((prevValue) => prevValue + 1)}
  activeOpacity={0.8}
>
  <FontAwesome name="angle-right" size={24} color="#000" />
</TouchableOpacity>

<TouchableOpacity
  style={[styles.buttonIcon,styles.rightButton]}
  onPress={() => setInputKilo((prevValue) => prevValue + 5)}
  activeOpacity={0.8}
>
  <FontAwesome name="angle-double-right" size={24} color="#000" />
</TouchableOpacity>
              </View>
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
  containerAnnonce: {
    flexGrow: 1,
    marginTop: 150,
    width:"90%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rectangle: {
    width: 200,
    height: 100,
    backgroundColor: "rgba(138, 43, 226, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 1,
  },
  containerInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: 'center', // Centres the icon horizontally
    alignItems: "center",
    marginBottom: 20,
  },
  buttonIcon:{
    width: 35,
    height: 35,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  leftButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  rightButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  returnButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
  annoncesContainer:{
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "rgba(255, 0, 0, 0.2)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    }, 
  annoncesHeader: {
    alignItems: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius:5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#966DE1",
  },
  containerAnnonceAjout:{
    // marginTop: 150,
    width: 200,
    height: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
  selectFlightText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#BBA6E0",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#BBA6E0",
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
    backgroundColor: "#BBA6E0",
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
