// navigation/BottomTabNavigator.js
//ini sebenarnya bukan bottom nav, tapi stack untuk deklarasi variabel setiap screen
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import HubungiKami from '../screens/HubungiKami';

const Stack = createNativeStackNavigator();

const AppScreens = () => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="HubungiKami" component={HubungiKami} />
      <Stack.Screen
        name={isAdmin ? 'Admin' : 'Profile'}
        component={isAdmin ? AdminScreen : ProfileScreen}
      />
    </>
  );
};

export default AppScreens;
