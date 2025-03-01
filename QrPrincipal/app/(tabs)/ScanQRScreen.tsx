import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera'; // ✅ CORRECTO
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ScanQRScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // ✅ Usamos expo-camera
      setHasPermission(status === 'granted');
    };
    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('Código QR Escaneado', `Tipo: ${type}\nDatos: ${data}`, [
      { text: 'OK', onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return <Text style={styles.permissionText}>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.permissionText}>Acceso a la cámara denegado. Habilítalo en la configuración.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escanear Código QR</Text>
      <View style={styles.scannerContainer}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // ✅ Usamos Camera en lugar de BarCodeScanner
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/index')}>
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
