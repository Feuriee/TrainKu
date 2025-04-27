import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../navigation/Footer';
import LeafletMap from '../context/LeafletMap';

// Import leaflet components dan CSS secara kondisional
let MapContainer, TileLayer, MarkerWeb, Popup;
if (Platform.OS === 'web') {
  // Import CSS langsung di sini
  require('leaflet/dist/leaflet.css');

  // Kemudian import komponen-komponennya
  const leaflet = require('react-leaflet');
  MapContainer = leaflet.MapContainer;
  TileLayer = leaflet.TileLayer;
  MarkerWeb = leaflet.Marker;
  Popup = leaflet.Popup;
}

export default function ContactScreen() {
  const navigation = useNavigation();
  const latitude = -3.758400;
  const longitude = 102.276666; 

  return (
    <View style={styles.container}>

      {/* Navbar */}
      <View style={styles.header}>
        <Text style={styles.logo}>TrainKu</Text>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
            <Text style={styles.navLink}>Beli Tiket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.navLink}>Jadwal Kereta</Text>
          </TouchableOpacity>
          <Ionicons name="search" size={22} style={styles.iconSearch} onPress={() => navigation.navigate('Search')} />
          <Ionicons name="person-circle-outline" size={26} style={styles.iconUser} onPress={() => navigation.navigate('Profile')} />
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>HUBUNGI KAMI</Text>
        <Text style={styles.heroSubtitle}>Dimanapun Anda Berada, Kami Akan Selalu Terhubung dengan Anda!</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          <Text style={{ fontWeight: '700' }}>Halo,{"\n"}Bagaimana kami dapat membantumu?</Text>
        </Text>

        <View style={styles.containerFlex}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <View style={styles.contactCS}>
              <View style={styles.contactCSHeader}>
                <FontAwesome5 name="headset" size={24} color="#2a6af0" />
                <Text style={styles.contactCSTitle}>Hubungi customer service kami</Text>
              </View>
              <View style={styles.contactCSList}>
                <View style={styles.contactCSItem}>
                  <FontAwesome name="phone" size={18} color="#7a7a7a" />
                  <Text style={styles.contactCSItemText}>Telepon customer service kami</Text>
                </View>
                <View style={styles.contactCSItem}>
                  <FontAwesome name="envelope-o" size={18} color="#7a7a7a" />
                  <Text style={styles.contactCSItemText}>Kirim email ke customer service</Text>
                </View>
              </View>
            </View>

            {/* Office Section */}
            <View style={{ height: 300, width: '100%' }}>
              {Platform.OS === 'web' ? (
                <LeafletMap latitude={latitude} longitude={longitude} />
              ) : (
                <MapView
                  style={{ height: '100%', width: '100%' }}
                  initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{ latitude, longitude }}
                    title="Kantor Customer Service"
                    description="Kapuas, Gading Cempaka, Bengkulu"
                  />
                </MapView>
              )}
            </View>

          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <TouchableOpacity style={styles.inbox} activeOpacity={0.7}>
              <Text style={styles.inboxText}>Kotak Masuk</Text>
              <FontAwesome5 name="chevron-right" size={20} color="#2a6af0" />
            </TouchableOpacity>

            <Text style={styles.popularTopicsTitle}>Topik Populer</Text>
            <View style={styles.topicsList}>
              {[
                "Cara reschedule tiket kereta",
                "Cara membatalkan dan refund tiket kereta",
                "Cara koreksi nama penumpang kereta",
                "Cara memakai promo aplikasi",
                "Cara melakukan payment tiket kereta"
              ].map((topic, index) => (
                <TouchableOpacity key={index} style={styles.topicItem} activeOpacity={0.7}>
                  <Text style={styles.topicText}>{topic}</Text>
                  <FontAwesome5 name="chevron-right" size={18} color="#2a6af0" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 6,
  },
  iconSearch: {
    marginHorizontal: 6,
  },
  iconUser: {
    marginHorizontal: 6,
  },
  hero: {
    backgroundColor: '#3b7de3',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  greeting: {
    fontSize: 22,
    marginBottom: 24,
  },
  containerFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    minWidth: 320,
    maxWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
  },
  contactCS: {
    marginBottom: 24,
  },
  contactCSHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  contactCSTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  contactCSList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  contactCSItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  contactCSItemText: {
    fontWeight: '700',
    fontSize: 16,
  },
  office: {
    marginTop: 16,
  },
  officeTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 4,
  },
  officeAddress: {
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 12,
    color: '#222',
  },
  mapImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
  },
  btnVisit: {
    backgroundColor: '#0a64ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  btnVisitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  rightColumn: {
    flex: 1,
    minWidth: 320,
    maxWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
  },
  inbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 24,
    elevation: 2,
  },
  inboxText: {
    fontWeight: '700',
    fontSize: 18,
  },
  popularTopicsTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 12,
  },
  topicsList: {
    marginBottom: 24,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 12,
  },
  topicText: {
    fontWeight: '700',
    fontSize: 16,
    flexShrink: 1,
  },
});
