import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const PaymentScreen = ({ navigation }) => {
  const [bookingData, setBookingData] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load booking data
  useEffect(() => {
    loadBookingData();
  }, []);

  const loadBookingData = async () => {
    try {
      const data = await AsyncStorage.getItem('bookingData');
      console.log("Loading booking data:", data);
      
      if (data) {
        setBookingData(JSON.parse(data));
      } else {
        console.log("No booking data found");
      }
    } catch (error) {
      console.error("Error loading booking data:", error);
      Alert.alert('Error', 'Gagal mengambil data booking: ' + error.message);
    }
  };

  const handlePayment = async () => {
    try {
      // Validasi input
      if (!cardNumber || !name) {
        Alert.alert('Gagal', 'Harap isi data pembayaran dengan lengkap!');
        return;
      }

      setIsLoading(true);
      
      // Hapus data booking dari AsyncStorage dengan await
      try {
        await AsyncStorage.removeItem('bookingData');
        console.log("Data removed from AsyncStorage");
        
        // PENTING: Update state setelah data dihapus
        setBookingData(null);
        
        // Reset form
        setCardNumber('');
        setName('');
        
        // Tampilkan konfirmasi pembayaran berhasil
        Alert.alert(
          'Sukses',
          'Pembayaran berhasil diproses! Data booking telah dihapus.',
          [
            { 
              text: 'OK', 
              onPress: () => {
                // Navigasi kembali ke home screen jika perlu
                if (navigation && navigation.navigate) {
                  navigation.navigate('Home');
                }
              }
            }
          ]
        );
      } catch (error) {
        console.error("Error removing data:", error);
        Alert.alert('Error', 'Gagal menghapus data booking: ' + error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert('Error', 'Terjadi kesalahan saat memproses pembayaran: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk memastikan data benar-benar dihapus
  const forceDeleteBookingData = async () => {
    setIsLoading(true);
    try {
      // Hapus data
      await AsyncStorage.removeItem('bookingData');
      
      // Untuk memastikan data benar-benar dihapus
      const checkData = await AsyncStorage.getItem('bookingData');
      
      if (!checkData) {
        console.log("Verified: Data successfully deleted");
        // Update state untuk refresh UI
        setBookingData(null);
        Alert.alert('Sukses', 'Data booking berhasil dihapus!');
      } else {
        console.log("Warning: Data still exists after deletion");
        Alert.alert('Peringatan', 'Data masih ada setelah mencoba dihapus. Coba hapus semua data.');
      }
    } catch (error) {
      console.error("Error in force delete:", error);
      Alert.alert('Error', 'Gagal menghapus data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Menampilkan indikator loading atau pesan jika tidak ada data
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Memproses...</Text>
      </View>
    );
  }

  if (!bookingData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>Tidak ada data booking.</Text>
        <Button 
          title="Kembali ke Home" 
          onPress={() => navigation && navigation.navigate('Home')}
          color="#1976D2"
        />
        <View style={styles.spacer} />
        <Button 
          title="Refresh Data" 
          onPress={loadBookingData}
          color="#4CAF50"
        />
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

      {/* Tombol Bayar */}
      <Button 
        title={isLoading ? "Memproses..." : "Bayar Sekarang"} 
        onPress={handlePayment}
        disabled={isLoading}
        color="#1976D2"
      />

      {/* Tombol-tombol debug */}
      <View style={styles.debugButtonsContainer}>
        <Text style={styles.debugTitle}>Opsi Debug:</Text>
        <Button 
          title="Batalkan Payment" 
          onPress={forceDeleteBookingData}
          color="#FF9800"
        />
        <View style={styles.spacer} />
        <Button 
          title="Refresh Data" 
          onPress={loadBookingData}
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 2,
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  noDataText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  debugButtonsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  spacer: {
    height: 10,
  }
});

export default PaymentScreen;