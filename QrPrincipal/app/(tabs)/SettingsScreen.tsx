import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const SettingsScreen = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.label, theme === 'dark' ? styles.darkText : styles.lightText]}>
        {language === 'es' ? 'Configuración' : 'Settings'}
      </Text>

      {/* Cambio de Tema */}
      <View style={styles.settingRow}>
        <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
          {language === 'es' ? 'Modo Oscuro' : 'Dark Mode'}
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
        />
      </View>

      {/* Cambio de Idioma */}
      <View style={styles.settingRow}>
        <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
          {language === 'es' ? 'Idioma' : 'Language'}
        </Text>
        <Switch
          value={language === 'es'}
          onValueChange={(value) => setLanguage(value ? 'es' : 'en')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default SettingsScreen;
