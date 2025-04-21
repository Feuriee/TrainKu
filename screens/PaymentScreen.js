import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const [bookingData, setBookingData] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const data = await AsyncStorage.getItem('bookingData');
        if (data) {
          setBookingData(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil data booking.');
      }
    };

    loadBookingData();
  }, []);

  const handlePayment = () => {
    if (!cardNumber || !name) {
      Alert.alert('Gagal', 'Harap isi data pembayaran dengan lengkap!');
      return;
    }

    Alert.alert(
      'Sukses',
      `Pembayaran untuk kode booking ${bookingData.kodeBooking} berhasil diproses!`
    );

    setCardNumber('');
    setName('');
    AsyncStorage.removeItem('bookingData'); // Hapus data setelah pembayaran
  };

  if (!bookingData) {
    return (
      <View style={styles.container}>
        <Text>Memuat data booking...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran</Text>

      <View style={styles.bookingInfo}>
        <Text style={styles.label}>Kode Booking: {bookingData.kodeBooking}</Text>
        <Text style={styles.label}>Asal: {bookingData.asal}</Text>
        <Text style={styles.label}>Tujuan: {bookingData.tujuan}</Text>
        <Text style={styles.label}>Tanggal: {bookingData.tanggal}</Text>
        <Text style={styles.label}>Dewasa: {bookingData.dewasa}</Text>
        <Text style={styles.label}>Bayi: {bookingData.bayi}</Text>
      </View>

      <Text style={styles.label}>Nama di Kartu</Text>
      <TextInput
        placeholder="Nama di Kartu"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Nomor Kartu</Text>
      <TextInput
        placeholder="Nomor Kartu"
        style={styles.input}
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <Button title="Bayar Sekarang" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1976D2',
  },
  bookingInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default PaymentScreen;
