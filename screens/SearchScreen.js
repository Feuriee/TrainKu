import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={styles.card}>
      <Ionicons name="train-outline" size={28} color="#1976D2" style={styles.icon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.trainName}>{item.name}</Text>
        <Text style={styles.subText}>Kereta Eksekutif</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cari Kereta</Text>
      <TextInput
        placeholder="Masukkan nama kereta"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.subTitle}>Hasil Pencarian</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        ListEmptyComponent={<Text style={styles.noResult}>Tidak ditemukan.</Text>}
      />

      <Text style={styles.subTitle}>Kereta Populer</Text>
      <FlatList
        data={popularTrains}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
      />
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
    marginBottom: 15,
    color: '#1976D2',
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
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  noResult: {
    fontStyle: 'italic',
    color: '#757575',
    marginBottom: 10,
  },
});

export default SearchScreen;
