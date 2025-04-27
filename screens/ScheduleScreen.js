import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stasiunList } from '../data/Stasiun';
import { Ionicons } from '@expo/vector-icons';

const dummySchedule = stasiunList.slice(0, 4).map((stasiun, index) => ({
  id: String(index + 1),
  train: ['Argo Bromo', 'Gajayana', 'Taksaka', 'Matarmaja'][index],
  depart: ['08:00', '10:30', '13:15', '18:45'][index],
  arrive: ['12:00', '15:00', '18:00', '23:30'][index],
  asal: stasiun,
  tujuan: stasiunList[(index + 2) % stasiunList.length],
}));

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('all');

  const filterSchedule = (schedule) => {
    if (!schedule || !Array.isArray(schedule)) return [];
    
    if (filter === 'all') return schedule;
    if (filter === 'pagi') return schedule.filter(s => parseInt(s.depart.split(":")[0]) < 12);
    if (filter === 'siang') return schedule.filter(s => parseInt(s.depart.split(":")[0]) >= 12 && parseInt(s.depart.split(":")[0]) < 17);
    if (filter === 'malam') return schedule.filter(s => parseInt(s.depart.split(":")[0]) >= 17);
    return schedule;
  };

  const renderCard = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultLeft}>
        <View style={styles.trainInfo}>
          <Text style={styles.trainName}>{item.train}</Text>
          <Text style={styles.trainSubtitle}>Asal: {item.asal}</Text>
          <Text style={styles.trainSubtitle}>Tujuan: {item.tujuan}</Text>
          <Text style={styles.trainSubtitle}>Keberangkatan: {item.depart}</Text>
          <Text style={styles.trainSubtitle}>Kedatangan: {item.arrive}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() =>
          navigation.navigate('TrainDetail', {
            train: item.train,
            asal: item.asal,
            tujuan: item.tujuan,
            depart: item.depart,
            arrive: item.arrive,
          })
        }
      >
        <Text style={styles.btnInfo}>Info Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
                  <Text style={[styles.navItem, styles.activeNav]}>Jadwal Kereta</Text>
              </TouchableOpacity>
                  <Ionicons name="search" size={22} style={styles.icon} onPress={() => navigation.navigate('Search')} />
                  <Ionicons name="person-circle-outline" size={26} style={styles.icon} onPress={() => navigation.navigate('Profile')} />
          </View>
      </View>
    <View style={styles.elemen}>
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
        renderItem={renderCard}
        ListEmptyComponent={<Text style={styles.noResult}>Tidak ditemukan.</Text>}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  elemen: { 
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0066ff',
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
  resultItem: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainInfo: {
    marginLeft: 0,
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  trainSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  btnContainer: {
    backgroundColor: '#0066ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  btnInfo: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResult: {
    fontStyle: 'italic',
    color: '#757575',
    marginBottom: 10,
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeNav: {
    color: '#2962FF',
    fontWeight: 'bold',
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
  icon: {
    marginHorizontal: 8,
    color: '#000',
  },
});

export default ScheduleScreen;