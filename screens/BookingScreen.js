import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stasiunList } from '../data/Stasiun';
import { Ionicons } from '@expo/vector-icons';

const popularDestinations = [
  { name: 'Jakarta', image: require('../assets/jakarta.jpeg') },
  { name: 'Surabaya', image: require('../assets/surabaya.jpeg') },
  { name: 'Yogyakarta', image: require('../assets/yogya.jpg') },
  { name: 'Palembang', image: require('../assets/palembang.jpg') },
  { name: 'Bandung', image: require('../assets/bandung.jpeg') },
  { name: 'Semarang', image: require('../assets/semarang.jpeg') },
  { name: 'Bali', image: require('../assets/bali.jpeg') },
];

const BookingScreen = () => {
  const navigation = useNavigation();
  const [asal, setAsal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [dewasa, setDewasa] = useState(1);
  const [bayi, setBayi] = useState(0);
  const [kelas, setKelas] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalKelasVisible, setModalKelasVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectingField, setSelectingField] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible || modalKelasVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible, modalKelasVisible]);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(Math.max(0, value - 1));

  const generateKodeBooking = () => `TRN${Math.floor(10000000 + Math.random() * 90000000)}`;

  const handleSubmit = async () => {
    if (!asal || !tujuan) {
      alert('Silakan isi semua kolom.');
      return;
    }
    const bookingData = {
      kodeBooking: generateKodeBooking(),
      asal,
      tujuan,
      tanggal,
      dewasa,
      bayi,
    };
    try {
      await AsyncStorage.setItem('bookingData', JSON.stringify(bookingData));
      navigation.navigate('Payment');
    } catch (error) {
      alert('Gagal menyimpan data booking.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>TrainKu</Text>
        <View style={styles.navItems}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
            <Text style={[styles.navItem, styles.activeNav]}>Beli Tiket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.navItem}>Jadwal Kereta</Text>
          </TouchableOpacity>
          <Ionicons name="search" size={22} style={styles.icon} onPress={() => navigation.navigate('Search')} />
          <Ionicons name="person-circle-outline" size={26} style={styles.icon} onPress={() => navigation.navigate('Profile')} />
        </View>
      </View>

      {/* Header Image + Form */}
      <ImageBackground
        source={require('../assets/train-header.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.ticketCard}>
            <Text style={styles.ticketFormTitle}>Tiket Kereta Api</Text>
            <View style={styles.row}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Asal</Text>
                <TouchableOpacity style={styles.input} onPress={() => { setSelectingField('asal'); setModalVisible(true); }}>
                  <Text>{asal || 'Pilih Stasiun Asal'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Tujuan</Text>
                <TouchableOpacity style={styles.input} onPress={() => { setSelectingField('tujuan'); setModalVisible(true); }}>
                  <Text>{tujuan || 'Pilih Stasiun Tujuan'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.label}>Tanggal Keberangkatan</Text>
            <TextInput value={tanggal} onChangeText={setTanggal} style={styles.input} keyboardType="default" onFocus={(e) => { e.target.type = 'date'; }} />

            <Text style={styles.label}>Kelas</Text>
            <TouchableOpacity style={styles.input} onPress={() => setModalKelasVisible(true)}>
              <Text>{kelas || 'Pilih Kelas'}</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={styles.counterBox}>
                <Text style={styles.label}>Dewasa</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(setDewasa, dewasa)}>
                    <Text style={styles.counterBtn}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{dewasa}</Text>
                  <TouchableOpacity onPress={() => increment(setDewasa, dewasa)}>
                    <Text style={styles.counterBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.counterBox}>
                <Text style={styles.label}>Bayi</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(setBayi, bayi)}>
                    <Text style={styles.counterBtn}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{bayi}</Text>
                  <TouchableOpacity onPress={() => increment(setBayi, bayi)}>
                    <Text style={styles.counterBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Cari Tiket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Tujuan Populer */}
      <View style={styles.popularBox}>
        <Text style={styles.popularTitle}>TUJUAN POPULER</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.destinationList}
          style={Platform.OS === 'web' ? styles.scrollWeb : {}}
        >
          {popularDestinations.map((dest, idx) => (
            <TouchableOpacity key={idx} style={styles.destinationCard} activeOpacity={0.8}>
              <Image source={dest.image} style={styles.destinationImage} />
              <Text style={styles.destinationName}>{dest.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      {/* Modal pilih stasiun */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Stasiun</Text>
            <TextInput
              placeholder="Cari stasiun..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
            />
            <ScrollView>
              {stasiunList.filter(s => s.toLowerCase().includes(searchText.toLowerCase())).map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.modalItem}
                  onPress={() => {
                    if (selectingField === 'asal') setAsal(item);
                    else setTujuan(item);
                    setModalVisible(false);
                    setSearchText('');
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>

      {/* Modal Pilih Kelas */}
      <Modal transparent={true} visible={modalKelasVisible} animationType="fade">
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Kelas</Text>
            <TouchableOpacity style={styles.modalItem} onPress={() => { setKelas('Ekonomi'); setModalKelasVisible(false); }}>
              <Text>Ekonomi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => { setKelas('Eksekutif'); setModalKelasVisible(false); }}>
              <Text>Eksekutif</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalKelasVisible(false)}>
              <Text style={styles.closeButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>


    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    height: 520,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 600,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  ticketFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputHalf: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 8,
  },
  counterBox: {
    flex: 0.48,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  counterBtn: {
    fontSize: 20,
    color: '#1976D2',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#0066ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularBox: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  popularTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  destinationList: {
    paddingLeft: 10,
    paddingRight: 16,
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
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  closeButton: {
    marginTop: 12,
    textAlign: 'center',
    color: '#0066ff',
    fontWeight: 'bold',
  },
  scrollWeb: {
    overflowX: 'scroll', 
    display: 'flex',
    flexDirection: 'row',
  },
});

export default BookingScreen;