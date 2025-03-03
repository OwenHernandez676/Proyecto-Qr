import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 250); // Simula una actualización
  };

  return (
    <View style={styles.container}>
      {isRefreshing ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.title}>Owen’s QR</Text>
          <Text style={styles.subtitle}>¿Qué planeas hacer hoy?</Text>

          <View style={styles.optionsContainer}>
            {/* Opción: Escanear Código QR */}
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('/(tabs)/ScanQRScreen')}> 
              <View style={styles.cardContent}>
                <Ionicons name="scan-outline" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>Escanear Código QR</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigateTo('/(tabs)/ScanQRScreen')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Opción: Lista de Productos */}
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('/products')}> 
              <View style={styles.cardContent}>
                <Ionicons name="list-outline" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>Lista de Productos</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigateTo('/products')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Opción: Generar Producto/Qr */}
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('/generate')}> 
              <View style={styles.cardContent}>
                <MaterialCommunityIcons name="qrcode-edit" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>Generar un nuevo Producto/Qr</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigateTo('/generate')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Barra de Navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="home-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/search')}>
          <Ionicons name="search-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/cart')}>
          <Ionicons name="cart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/calculator')}>
          <Ionicons name="calculator-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/profile')}>
          <Ionicons name="person-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -100,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#F8F5F2',
    borderRadius: 15,
    padding: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '111%',
    backgroundColor: '#fff',
    paddingBottom: 15,
    height: 80,
  },
});

export default HomeScreen;
