import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const trainList = [
  { id: '1', name: 'Argo Bromo' },
  { id: '2', name: 'Gajayana' },
  { id: '3', name: 'Taksaka' },
  { id: '4', name: 'Serayu' },
  { id: '5', name: 'Matarmaja' },
];

const popularTrains = [
  { id: '101', name: 'Argo Wilis' },
  { id: '102', name: 'Turangga' },
  { id: '103', name: 'Lodaya' },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');

  const filtered = trainList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );


  const renderCard = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultLeft}>
        <Ionicons name="train-outline" size={28} color="#0066ff" style={styles.trainIcon} />
        <View style={styles.trainInfo}>
          <Text style={styles.trainName}>{item.name}</Text>
          <Text style={styles.trainSubtitle}>Kereta Eksekutif</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.btnInfo}>Info Selengkapnya</Text>
      </View>
    </View>
  );

  const renderPopular = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultLeft}>
        <Ionicons name="star-outline" size={28} color="#FFA000" style={styles.trainIcon} />
        <View style={styles.trainInfo}>
          <Text style={styles.trainName}>{item.name}</Text>
          <Text style={styles.trainSubtitle}>Kereta Populer</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.btnInfo}>Info Selengkapnya</Text>
      </View>
    </View>
  );


  const navigation = useNavigation();
  return (
    <View style={styles.elemen}>
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
                  <Text style={styles.navItem}>Jadwal Kereta</Text>
              </TouchableOpacity>
                  <Ionicons name="search" size={22} style={[styles.icon, styles.activeNav]} onPress={() => navigation.navigate('Search')} />
                  <Ionicons name="person-circle-outline" size={26} style={styles.icon} onPress={() => navigation.navigate('Profile')} />
          </View>
      </View>
      <View style={styles.container}>
      <Text style={styles.title}>Cari Kereta</Text>
      <TextInput
        placeholder="Tulis nama stasiun atau nama kereta"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      {query === '' ? (
        <>
          <Text style={styles.subTitle}>Kereta Populer</Text>
          <FlatList
            data={popularTrains}
            keyExtractor={(item) => item.id}
            renderItem={renderPopular}
          />
        </>
      ) : (
        <>
          <Text style={styles.subTitle}>Hasil Pencarian</Text>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            ListEmptyComponent={<Text style={styles.noResult}>Tidak ditemukan.</Text>}
          />
        </>
      )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  elemen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0066ff',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#424242',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#999',
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
  trainIcon: {
    color: '#0066ff',
    fontSize: 28,
  },
  trainInfo: {
    marginLeft: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInfo: {
    backgroundColor: '#0066ff',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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

export default SearchScreen;
