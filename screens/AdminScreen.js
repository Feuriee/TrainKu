import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const STORAGE_KEY = 'TRAIN_SCHEDULE';
const USERS_KEY = 'USER_LIST';
const TICKETS_SOLD_KEY = 'TICKETS_SOLD';

const AdminScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [trainName, setTrainName] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [ticketAvailable, setTicketAvailable] = useState(true);
  const [trainSchedule, setTrainSchedule] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      Alert.alert('Akses Ditolak', 'Anda tidak memiliki izin untuk mengakses halaman ini');
      navigation.navigate('Home');
    } else {
      loadSchedule();
      loadStats();
    }
  }, [user]);

  const loadSchedule = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTrainSchedule(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load schedule', e);
    }
  };

  const loadStats = async () => {
    try {
      const userValue = await AsyncStorage.getItem(USERS_KEY);
      const ticketValue = await AsyncStorage.getItem(TICKETS_SOLD_KEY);

      if (userValue != null) {
        const users = JSON.parse(userValue);
        setUserCount(users.length);
      }
      if (ticketValue != null) {
        setTicketsSold(parseInt(ticketValue, 10));
      }
    } catch (e) {
      console.error('Failed to load statistics', e);
    }
  };

  const saveSchedule = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save schedule', e);
    }
  };

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

    const updatedSchedule = [...trainSchedule, newSchedule];
    setTrainSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
    setTrainName('');
    setDepartureTime('');
  };

  const deleteSchedule = (id) => {
    const updated = trainSchedule.filter(item => item.id !== id);
    setTrainSchedule(updated);
    saveSchedule(updated);
  };

  const toggleTicketAvailable = () => {
    setTicketAvailable(!ticketAvailable);
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity
          style={styles.logoutButton}
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
          <Ionicons name="log-out-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tambah Jadwal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tambah Jadwal Kereta</Text>
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
          <TouchableOpacity style={styles.buttonPrimary} onPress={addSchedule}>
            <Text style={styles.buttonPrimaryText}>Tambah Jadwal</Text>
          </TouchableOpacity>
        </View>

        {/* Daftar Jadwal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daftar Jadwal</Text>
          {trainSchedule.length === 0 ? (
            <Text style={styles.emptyText}>Belum ada jadwal tersedia.</Text>
          ) : (
            <FlatList
              data={trainSchedule}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.trainName} - {item.departureTime}</Text>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteSchedule(item.id)}>
                    <Text style={styles.buttonDeleteText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        {/* Atur Tiket */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atur Ketersediaan Tiket</Text>
          <Text style={styles.statusText}>
            Tiket saat ini: {ticketAvailable ? 'Tersedia' : 'Tidak Tersedia'}
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonPrimary,
              { backgroundColor: ticketAvailable ? '#ef4444' : '#10b981' }
            ]}
            onPress={toggleTicketAvailable}
          >
            <Text style={styles.buttonPrimaryText}>
              {ticketAvailable ? 'Tutup Penjualan Tiket' : 'Buka Penjualan Tiket'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistik Real-time */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Statistik Pengguna</Text>
          <Text style={styles.statsText}>Total Pengguna: {userCount}</Text>
          <Text style={styles.statsText}>Total Tiket Terjual: {ticketsSold}</Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  /* ... styling kamu sebelumnya tetap, tidak perlu diubah ... */
  container: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPrimaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#475569',
  },
  buttonDelete: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonDeleteText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#475569',
  },
  statsText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default AdminScreen;
