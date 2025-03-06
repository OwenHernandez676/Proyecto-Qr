import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider } from '../../context/LanguageContext';
import HomeScreen from '../(tabs)/index'; // Pantalla principal
import ProductListScreen from '../ProductListScreen'; // Lista de productos
import CartScreen from '../(tabs)/CartScreen'; // Carrito de compras (debe existir)
import SettingsScreen from '../(tabs)/SettingsScreen'; // Configuración
import CalculatorScreen from '../(tabs)/CalculatorScreen'; // Calculadora
import SearchScreen from '../(tabs)/SearchScreen'; // Búsqueda


const Tab = createBottomTabNavigator();

const ProtectedRoutes = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !user) {
      router.replace('/Login');
    }
  }, [isReady, user]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Inicio"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Buscar"
            component={SearchScreen} 
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Calculadora"
            component={CalculatorScreen} 
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="calculator-outline" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Carrito"
            component={CartScreen} // Se asegura que el carrito esté en la barra
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Configuración"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
            }}
          />
        </Tab.Navigator>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default ProtectedRoutes;
