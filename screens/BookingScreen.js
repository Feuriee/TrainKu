import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stasiunList } from '../data/Stasiun';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingScreen = () => {
  const navigation = useNavigation();

  const [asal, setAsal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [dewasa, setDewasa] = useState(1);
  const [bayi, setBayi] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectingField, setSelectingField] = useState('');

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(Math.max(0, value - 1));

  const generateKodeBooking = () => {
    const random = Math.floor(10000000 + Math.random() * 90000000);
    return `TRN${random}`;
  };

  const handleSubmit = async () => {
    if (!asal || !tujuan) {
      Alert.alert('Peringatan', 'Silakan isi semua kolom.');
      return;
    }
  
    const kodeBooking = generateKodeBooking();
  
    const bookingData = {
      kodeBooking,
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
      Alert.alert('Error', 'Gagal menyimpan data booking.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pemesanan Tiket Kereta Api</Text>
      <Text style={styles.date}>{new Date().toDateString()}</Text>

      {/* Form */}
      <View style={styles.formGroup}>
        <Text>Stasiun Asal</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setSelectingField('asal');
            setModalVisible(true);
          }}
        >
          <Text style={{ color: asal ? '#000' : '#aaa' }}>
            {asal || 'Pilih Stasiun Asal'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text>Stasiun Tujuan</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setSelectingField('tujuan');
            setModalVisible(true);
          }}
        >
          <Text style={{ color: tujuan ? '#000' : '#aaa' }}>
            {tujuan || 'Pilih Stasiun Tujuan'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text>Tanggal Keberangkatan</Text>
        <TextInput
          value={tanggal}
          onChangeText={setTanggal}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.counterBox}>
          <Text>Dewasa</Text>
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
          <Text>Bayi (&lt; 3 tahun)</Text>
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
        <Text style={styles.buttonText}>Cari & Pesan Tiket</Text>
      </TouchableOpacity>

      {/* Modal Pilih Stasiun */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Stasiun</Text>
            <TextInput
              placeholder="Cari stasiun..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
            />
            <ScrollView style={{ maxHeight: 350 }}>
              {stasiunList
                .filter(item =>
                  item.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                      if (selectingField === 'asal') setAsal(item);
                      else setTujuan(item);
                      setModalVisible(false);
                      setSearchText('');
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#1565C0',
    color: '#fff',
    padding: 15,
    textAlign: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  date: {
    backgroundColor: '#1565C0',
    color: '#fff',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterBox: {
    flex: 1,
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  counterBtn: {
    fontSize: 20,
    padding: 10,
    color: '#1976D2',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 10,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  closeButtonWrapper: {
    alignItems: 'flex-end',
    marginTop: 15,
  },
  
  closeButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
    width: 80,
  },
  
});

export default BookingScreen;
