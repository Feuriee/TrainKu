import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import HubungiKami from '../screens/HubungiKami';
import PaymentScreen from '../screens/PaymentScreen';
import LoginScreen from '../screens/LoginScreen';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import { AuthContext } from '../context/AuthContext';
import AboutScreen from '../screens/About';

const Stack = createNativeStackNavigator();

const CustomHeader = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Gunakan user dari context
  const isAdmin = user?.role === 'admin';

  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>TrainKu</Text>
      <View style={styles.navItems}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.navItem}>Beli Tiket</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.navItem}>Jadwal Kereta</Text>
        </TouchableOpacity>
        <Ionicons name="search" size={22} style={styles.icon} onPress={() => navigation.navigate('Search')} />
        <Ionicons name="person-circle-outline" size={26} style={styles.icon} onPress={() => navigation.navigate('Profile')} />
        
        {/* Menampilkan link Admin hanya jika user adalah admin */}
        {isAdmin && (
          <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
            <Text style={[styles.navItem, { color: '#ff6b6b' }]}>Admin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const MainNavigator = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      {!user ? (
        // Stack Navigator untuk pengguna yang belum login
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        // Stack Navigator untuk pengguna yang sudah login (user biasa atau admin)
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />
          })}
        >
          {user.role === 'admin' ? (
            // Rute pertama untuk admin adalah halaman Admin
            <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
          ) : (
            // Rute pertama untuk user biasa adalah Home
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          )}
          
          {/* Rute-rute umum yang bisa diakses oleh admin dan user biasa */}
          <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Hubungi" component={HubungiKami} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Tentang Kami' }} />
          <Stack.Screen name="Privasi" component={PrivacyPolicy} options={{ title: 'Kebijakan Privasi' }} />

        </Stack.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeNav: {
    color: '#2962FF',
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 10,
  }
});

export default MainNavigator;