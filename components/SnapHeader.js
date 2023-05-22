import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SnapHeader = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={handleGoBack} 
        style={styles.containerBack} 
        activeOpacity={0.8}
      >
        <FontAwesome name="chevron-left" size={20} color="#ffffff" />
        <Text style={styles.title}>Retour</Text>
      </TouchableOpacity>
    </View>
  );  
};

const styles = {
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#e8be4b",
    height: 100,
    paddingHorizontal: 10,
  },
  containerBack: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 5,
  },
};

export default SnapHeader;
