import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [kiloData, setKiloData] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Appeler la route backend pour récupérer les annonces kilo de l'utilisateur
    fetch("http://192.168.110.74:3000/index/kilos/myKilo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user.username, token: user.token }), // Remplacez 'VotreUsername' par le nom d'utilisateur de l'utilisateur actuel
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("kilos/myKilo", data);
        if (data.result) {
          setKiloData(data.data);
        } else {
          console.log("Aucune annonce trouvée");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces:", error);
      });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/flight1.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.annonces}>
          <Text style={styles.header}>Mes annonces</Text>
          {kiloData.length > 0 ? (
            kiloData.map((item, index) => (
              <Text key={index} style={styles.kiloItem}>
                Annonce {index + 1}: Username - {item.username}, Kilo -{" "}
                {item.kilo}
              </Text>
            ))
          ) : (
            <Text style={styles.noData}>Aucune annonce trouvée</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FlightSubmission")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Je veux enregistrer mon N° de Vol
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FlightBoard")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Regarder les annonces de kilos selon votre N° de vol et date
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 70,
    fontWeight: "600",
    marginBottom: 200,
    color: "black",
    textAlign: "center",
  },
  annonces: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    marginBottom: 10,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 30,
    backgroundColor: "white",
    opacity: 0.7,
    borderRadius: 10,
  },
  textButton: {
    height: 50,
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 5,
    alignItems: "center",
    textAlign: "center",
    opacity: 1,
  },
  kiloItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
});
