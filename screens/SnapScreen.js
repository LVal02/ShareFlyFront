import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SnapHeader from "../components/SnapHeader";




export default function SnapScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
    dispatch(addPhoto(photo));
    
    const formData = new FormData();

console.log(photo);

    formData.append('photoFromFront', {
    uri: photo.uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
    });
    
console.log('formdata',formData);


    //On fait comment pour upload un fichier quand le backEnd n'est dans le phone ??
    // fetch('http://192.168.10.195:3000/upload', {
    // method: 'POST',
    // body: formData,
    // }).then((response) => response.json())
    // .then((data) => {
    //   console.log('data',data);
    // })
  }

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera type={type} flashMode={flashMode} ref={cameraRef} style={styles.camera}>
      <SnapHeader navigation={navigation} />


      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
          style={styles.button}
          activeOpacity={0.8}
        >
          <FontAwesome name='rotate-right' size={25} color='#ffffff' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
          style={styles.button}
          activeOpacity={0.8}
        >
          <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()} 
          activeOpacity={0.8}>
            
          <FontAwesome name='circle-thin' size={95} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </Camera>

    
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 22,
    marginHorizontal: 10,
  },
    snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
