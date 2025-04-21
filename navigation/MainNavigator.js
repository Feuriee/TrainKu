// navigation/MainNavigator.js
import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { isAdmin } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  const renderHeaderRight = (navigation) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={22} style={{ marginRight: 16 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(isAdmin ? 'Admin' : 'Profile')}>
        <Ionicons name="person-circle-outline" size={26} style={{ marginRight: 16 }} />
      </TouchableOpacity>

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={toggleMenu} style={{ marginRight: 10 }}>
            <Ionicons name="menu" size={28} color="#000" />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Home'); }} title="Home" />
        <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Booking'); }} title="Booking" />
        <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Schedule'); }} title="Schedule" />
        <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Payment'); }} title="Payment" />
        {!isAdmin && (
          <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Profile'); }} title="Profile" />
        )}
        {isAdmin && (
          <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Admin'); }} title="Admin" />
        )}
      </Menu>
    </View>
  );


  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: 'TrainKu',
        headerTitleAlign: 'left',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        headerRight: () => renderHeaderRight(navigation),
        headerLeft: () => null, 
      })}
    >

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name={isAdmin ? 'Admin' : 'Profile'} component={isAdmin ? AdminScreen : ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
