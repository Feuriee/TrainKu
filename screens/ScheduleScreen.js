import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈

const dummySchedule = [
  { id: '1', train: 'Argo Bromo', depart: '08:00', arrive: '12:00' },
  { id: '2', train: 'Gajayana', depart: '10:30', arrive: '15:00' },
  { id: '3', train: 'Taksaka', depart: '13:15', arrive: '18:00' },
  { id: '4', train: 'Matarmaja', depart: '18:45', arrive: '23:30' },
];

const ScheduleScreen = () => {
  const navigation = useNavigation(); // 👈
  const [filter, setFilter] = useState('all');

  const filterSchedule = (schedule) => {
    if (filter === 'all') return schedule;
    if (filter === 'pagi') return schedule.filter(s => parseInt(s.depart) < 12);
    if (filter === 'siang') return schedule.filter(s => parseInt(s.depart) >= 12 && parseInt(s.depart) < 17);
    if (filter === 'malam') return schedule.filter(s => parseInt(s.depart) >= 17);
    return schedule;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Kereta</Text>

      <View style={styles.filterRow}>
        {['all', 'pagi', 'siang', 'malam'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={filter === f ? styles.activeText : styles.filterText}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filterSchedule(dummySchedule)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.train}>{item.train}</Text>
            <Text style={styles.detail}>Keberangkatan: {item.depart}</Text>
            <Text style={styles.detail}>Kedatangan: {item.arrive}</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() =>
                navigation.navigate('Booking', {
                  asal: 'Jakarta', // Atur asal default atau bisa kosong
                  tujuan: 'Surabaya', // Sama
                  kereta: item.train,
                  waktu: item.depart,
                })
              }
            >
              <Text style={styles.bookButtonText}>Pesan</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f9ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
  },
  activeFilter: {
    backgroundColor: '#1976d2',
  },
  filterText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  train: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#0288d1',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;
