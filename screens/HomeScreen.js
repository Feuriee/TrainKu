import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../navigation/Footer';

const screenWidth = Dimensions.get('window').width;

// Popular destinations data from your specification
const popularDestinations = [
  { name: 'Jakarta', image: require('../assets/jakarta.jpeg') },
  { name: 'Surabaya', image: require('../assets/surabaya.jpeg') },
  { name: 'Yogyakarta', image: require('../assets/yogya.jpg') },
  { name: 'Palembang', image: require('../assets/palembang.jpg') },
  { name: 'Bandung', image: require('../assets/bandung.jpeg') },
  { name: 'Semarang', image: require('../assets/semarang.jpeg') },
  { name: 'Bali', image: require('../assets/bali.jpeg') },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Navbar */}
      <View style={styles.navbar}>
              <Text style={styles.logo}>TrainKu</Text>
              <View style={styles.navItems}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={[styles.navItem, styles.activeNav]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
                  <Text style={styles.navItem}>Beli Tiket</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                  <Text style={styles.navItem}>Jadwal Kereta</Text>
                </TouchableOpacity>
                <Ionicons name="search" size={22} style={styles.icon} onPress={() => navigation.navigate('Search')} />
                <Ionicons name="person-circle-outline" size={26} style={styles.icon} onPress={() => navigation.navigate('Profile')} />
              </View>
            </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <ImageBackground
          source={require('../assets/train-header.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.welcome}>SELAMAT DATANG</Text>
            <Text style={styles.subtext}>Temukan tiket kereta mu disini!</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Booking')}
            >
              <Text style={styles.loginText}>Kunjungi</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Popular Destinations Section */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>Destinasi Populer</Text>
          <ScrollView horizontal style={styles.destinationScroll}>
            {popularDestinations.map((destination, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.destinationCard}
                onPress={() => navigation.navigate('Booking', { destination: destination.name })}
              >
                <Image source={destination.image} style={styles.destinationImage} />
                <Text style={styles.destinationName}>{destination.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promo Section */}
        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Promo Spesial</Text>
          <View style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Diskon 15%</Text>
              <Text style={styles.promoDesc}>Untuk perjalanan di akhir pekan!</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.buttonText}>Klaim Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Features */}
        <View style={styles.features}>
          <View style={styles.featureBox}>
            <MaterialCommunityIcons name="train" size={36} color="#2962FF" />
            <Text style={styles.featureTitle}>Jadwal Kereta Api</Text>
            <Text style={styles.featureDesc}>
              Lihat Jadwal Kereta Api yang akan berangkat selanjutnya
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigation.navigate('Schedule')}
            >
              <Text style={styles.buttonText}>Kunjungi</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featureBox}>
            <MaterialCommunityIcons
              name="ticket-confirmation"
              size={36}
              color="#2962FF"
            />
            <Text style={styles.featureTitle}>Beli Tiket Kereta Api</Text>
            <Text style={styles.featureDesc}>
              Kemana kamu mau pergi? Yuk beli tiketnya disini!!
            </Text>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigation.navigate('Booking')}
            >
              <Text style={styles.buttonText}>Kunjungi</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Travel Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips Perjalanan</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#2962FF" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Datang Lebih Awal</Text>
                <Text style={styles.tipDesc}>Tiba 30 menit sebelum keberangkatan</Text>
              </View>
            </View>
            <View style={styles.tipItem}>
              <MaterialCommunityIcons name="bag-checked" size={24} color="#2962FF" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Siapkan Dokumen</Text>
                <Text style={styles.tipDesc}>Tiket dan identitas selalu siap</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    flexGrow: 1,
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
    color: '#000',
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
  activeNav: {
    color: '#2962FF',
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 8,
    color: '#000',
  },
  headerImage: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtext: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2962FF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Popular Destinations Section - Updated
  popularSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  destinationScroll: {
    flexDirection: 'row',
  },
  destinationCard: {
    width: 260,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    transition: 'transform 0.2s',
  },
  destinationImage: {
    width: '100%',
    height: 160,
  },
  destinationName: {
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  
  // Promo Section
  promoSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  promoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoDesc: {
    color: '#000',
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: '#2962FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Features Section
  features: {
    flexDirection: screenWidth > 600 ? 'row' : 'column',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  featureBox: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    elevation: 1,
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  featureDesc: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  featureButton: {
    backgroundColor: '#2962FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  
  // Tips Section
  tipsSection: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  tipsList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tipContent: {
    marginLeft: 15,
    flex: 1,
  },
  tipTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tipDesc: {
    color: '#666',
    fontSize: 12,
  },
});

export default HomeScreen;