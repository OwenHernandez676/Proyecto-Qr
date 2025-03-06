import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GenerateQRScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de generación de QR en construcción...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GenerateQRScreen;
