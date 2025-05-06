import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; 
import Footer from '../navigation/Footer';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      {/* Navbar */}
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
          <Ionicons name="person-circle-outline" size={26} style={[styles.icon, styles.activeNav]} onPress={() => navigation.navigate('Profile')} />
        </View>
      </View>

      {/* Profile Content */}
      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          {/* Profile Image */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={require('../assets/UserProfile.jpg')}
              style={styles.profileImage}
            />
          </View>

          {/* Name and Info */}
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
          <Text style={styles.profilePhone}>0858 yang lainnya kapan kapan</Text>

          {/* Role */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleText}>
              Role: {user?.role === 'admin' ? 'Administrator' : 'User'}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.btnEdit}>
              <Ionicons name="create-outline" size={16} color="#0a66ff" />
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnPassword}>
              <Ionicons name="lock-closed-outline" size={16} color="#0a66ff" />
              <Text style={styles.btnText}>Ubah Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogout}
              onPress={() => {
                if (Platform.OS === 'web') {
                  const confirm = window.confirm('Apakah kamu yakin ingin logout?');
                  if (confirm) handleLogout();
                } else {
                  Alert.alert(
                    'Konfirmasi Logout',
                    'Apakah kamu yakin ingin keluar?',
                    [
                      { text: 'Batal', style: 'cancel' },
                      { text: 'Logout', onPress: handleLogout, style: 'destructive' }
                    ]
                  );
                }
              }}
            >
              <Ionicons name="log-out-outline" size={16} color="#d93025" />
              <Text style={styles.btnLogoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <View style={styles.list}>
            <TouchableOpacity style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name="receipt-outline" size={20} color="#0a66ff" />
                <Text style={styles.listItemText}>Riwayat Pemesanan</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name="heart-outline" size={20} color="#0a66ff" />
                <Text style={styles.listItemText}>Destinasi Favorit</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name="card-outline" size={20} color="#0a66ff" />
                <Text style={styles.listItemText}>Metode Pembayaran</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItem}
              onPress={() => navigation.navigate('Hubungi')}
            >
              <View style={styles.listItemLeft}>
                <Ionicons name="call-outline" size={20} color="#0a66ff" />
                <Text style={styles.listItemText}>Hubungi Kami</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginHorizontal: 8,
    color: '#000',
  },
  activeNav: {
    color: '#2962FF',
    fontWeight: 'bold',
  },
  main: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    maxWidth: 480,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#0a66ff',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b6b6b',
    textAlign: 'center',
  },
  profilePhone: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 16,
  },
  roleContainer: {
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },
  roleText: {
    color: '#0a66ff',
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  btnEdit: {
    backgroundColor: '#eaf2ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 6,
  },
  btnPassword: {
    backgroundColor: '#eaf2ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 6,
  },
  btnLogout: {
    backgroundColor: '#fff0f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 6,
  },
  btnText: {
    marginLeft: 6,
    color: '#0a66ff',
    fontWeight: '600',
    fontSize: 12,
  },
  btnLogoutText: {
    marginLeft: 6,
    color: '#d93025',
    fontWeight: '600',
    fontSize: 12,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e6e8eb',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
});

export default ProfileScreen;
