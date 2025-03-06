import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product list screen en construcción...</Text>
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

export default ProductListScreen;
