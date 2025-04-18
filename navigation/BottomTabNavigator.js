import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import SearchScreen from '../screens/SearchScreen';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTabs = () => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: 'TrainKu',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
        tabBarStyle: { paddingBottom: 5, height: 60 },
        headerTitleAlign: 'left',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="train" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={isAdmin ? 'Admin' : 'Profile'}
        component={isAdmin ? AdminScreen : ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isAdmin ? 'settings' : 'person'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
