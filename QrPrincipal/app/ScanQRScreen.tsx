import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NativeModules } from 'react-native';
const Torch = NativeModules.Torch;
import * as ImagePicker from 'expo-image-picker';

const ScanQRScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('Código QR Escaneado', `Tipo: ${type}\nDatos: ${data}`, [
      { text: 'OK', onPress: () => setScanned(false) },
    ]);
  };

  const toggleFlash = () => {
    setFlash((prevFlash) => {
      const newFlashState = !prevFlash;
      Torch.switchState(newFlashState);
      return newFlashState;
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      Alert.alert('Imagen seleccionada', 'Aquí se puede analizar el código QR en la imagen.');
    }
  };

  if (!permission) {
    return <Text style={styles.permissionText}>Solicitando permiso de la cámara...</Text>;
  }
  if (!permission.granted) {
    return <Text style={styles.permissionText}>Acceso a la cámara denegado. Habilítalo en la configuración.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escanear Código QR</Text>
      <View style={styles.scannerContainer}>
        <CameraView
          key={permission.granted ? 'camera' : 'no-camera'}
          style={StyleSheet.absoluteFillObject}
          facing="back"
          flash={flash ? 'torch' : 'off'}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.overlay}>
          <View style={styles.qrFrame}>
            <Animated.View style={[styles.scanLine, { opacity: animation }]} />
          </View>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Ionicons name={flash ? "flash" : "flash-off"} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
          <Ionicons name="images" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('../(tabs)/index')}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scannerContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  scanLine: {
    width: '100%',
    height: 4,
    backgroundColor: 'red',
    position: 'absolute',
    top: '50%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ScanQRScreen;