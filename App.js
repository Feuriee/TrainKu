import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { AuthProvider } from './context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import 'leaflet/dist/leaflet.css';


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
