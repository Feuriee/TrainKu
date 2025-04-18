import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const trainList = [
  { id: '1', name: 'Argo Bromo' },
  { id: '2', name: 'Gajayana' },
  { id: '3', name: 'Taksaka' },
  { id: '4', name: 'Serayu' },
  { id: '5', name: 'Matarmaja' },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');

  const filtered = trainList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
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
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.result}>
            <Text>{item.name}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  result: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default SearchScreen;
