import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 250);
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      {isRefreshing ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : (
        <>
          <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Owen’s QR
          </Text>
          <Text style={[styles.subtitle, theme === 'dark' ? styles.darkText : styles.lightText]}>
            {language === 'es' ? '¿Qué planeas hacer hoy?' : 'What do you plan to do today?'}
          </Text>

          <View style={styles.optionsContainer}>
            {/* Opción: Escanear Código QR */}
            <TouchableOpacity style={styles.card} onPress={() => router.push('/ScanQRScreen')}>
              <View style={styles.cardContent}>
                <Ionicons name="scan-outline" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>
                  {language === 'es' ? 'Escanear Código QR' : 'Scan QR Code'}
                </Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/ScanQRScreen')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Opción: Lista de Productos */}
            <TouchableOpacity style={styles.card} onPress={() => router.push('../ProductListScreen')}>
              <View style={styles.cardContent}>
                <Ionicons name="list-outline" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>
                  {language === 'es' ? 'Lista de Productos' : 'Product List'}
                </Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => router.push('../ProductListScreen')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Opción: Generar Producto/Qr */}
            <TouchableOpacity style={styles.card} onPress={() => router.push('../GenerateQRScreen')}>
              <View style={styles.cardContent}>
                <MaterialCommunityIcons name="qrcode-edit" size={40} color="black" style={styles.icon} />
                <Text style={styles.cardText}>
                  {language === 'es' ? 'Generar un nuevo Producto/Qr' : 'Generate a new Product/QR'}
                </Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => router.push('../GenerateQRScreen')}>
                <Text style={styles.buttonText}>PARTICIPAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FAF3F0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1, // Evita que el texto se desborde
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default HomeScreen;
