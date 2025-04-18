import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const AdminScreen = () => {
  const [trainSchedule, setTrainSchedule] = useState([]);
  const [trainName, setTrainName] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [ticketAvailable, setTicketAvailable] = useState(true);

  const addSchedule = () => {
    if (!trainName || !departureTime) {
      Alert.alert('Error', 'Harap isi semua data!');
      return;
    }

    const newSchedule = {
      id: Date.now().toString(),
      trainName,
      departureTime,
      ticketAvailable,
    };

    setTrainSchedule([...trainSchedule, newSchedule]);
    setTrainName('');
    setDepartureTime('');
  };

  const deleteSchedule = (id) => {
    const updated = trainSchedule.filter(item => item.id !== id);
    setTrainSchedule(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      {/* Form tambah jadwal */}
      <Text style={styles.sectionTitle}>Tambah Jadwal Kereta</Text>
      <TextInput
        placeholder="Nama Kereta"
        value={trainName}
        onChangeText={setTrainName}
        style={styles.input}
      />
      <TextInput
        placeholder="Waktu Berangkat (cth: 12:30)"
        value={departureTime}
        onChangeText={setDepartureTime}
        style={styles.input}
      />
      <Button title="Tambah Jadwal" onPress={addSchedule} />

      {/* Daftar jadwal */}
      <Text style={styles.sectionTitle}>Daftar Jadwal</Text>
      <FlatList
        data={trainSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.trainName} - {item.departureTime}</Text>
            <Button
              title="Hapus"
              color="red"
              onPress={() => deleteSchedule(item.id)}
            />
          </View>
        )}
      />

      {/* Ketersediaan Tiket */}
      <Text style={styles.sectionTitle}>Atur Ketersediaan Tiket</Text>
      <Text style={{ marginBottom: 10 }}>
        Tiket saat ini: {ticketAvailable ? 'Tersedia' : 'Tidak Tersedia'}
      </Text>
      <Button
        title={ticketAvailable ? 'Tutup Penjualan Tiket' : 'Buka Penjualan Tiket'}
        onPress={() => setTicketAvailable(!ticketAvailable)}
      />

      {/* Statistik Pengguna (simulasi) */}
      <Text style={styles.sectionTitle}>Statistik Pengguna</Text>
      <Text>Total Pengguna: 120</Text>
      <Text>Total Tiket Terjual: 87</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AdminScreen;
