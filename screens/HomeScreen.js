import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const saldo = 120000;

  const handleTopUp = () => console.log('Top Up pressed');
  const handleRiwayat = () => console.log('Riwayat pressed');

  const promoList = [
    { id: 1, title: 'Diskon 20% untuk rute Jakarta - Bandung' },
    { id: 2, title: 'Promo Lebaran: Cashback 50rb!' },
  ];

  const popularDestinations = ['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{getGreeting()}, User 👋</Text>
      <Text style={styles.subtitle}>Pesan tiket kereta dengan mudah dan cepat!</Text>

      {/* Train Pay */}
      <View style={styles.trainPayContainer}>
        <Text style={styles.trainPayTitle}>Train Pay</Text>
        <Text style={styles.saldo}>Rp {saldo.toLocaleString('id-ID')}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleTopUp}>
            <Text style={styles.buttonText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRiwayat}>
            <Text style={styles.buttonText}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo Terbaru */}
      <Text style={styles.sectionTitle}>Promo Terbaru</Text>
      {promoList.map(promo => (
        <View key={promo.id} style={styles.promoItem}>
          <Text style={styles.promoText}>🎉 {promo.title}</Text>
        </View>
      ))}

      {/* Tujuan Terpopuler */}
      <Text style={styles.sectionTitle}>Tujuan Terpopuler</Text>
      <View style={styles.destinationsContainer}>
        {popularDestinations.map((city, index) => (
          <View key={index} style={styles.destinationBox}>
            <Text style={styles.destinationText}>🚆 {city}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  trainPayContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  trainPayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saldo: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promoItem: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  promoText: {
    fontSize: 15,
    color: '#E65100',
  },
  destinationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  destinationBox: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  destinationText: {
    fontSize: 14,
    color: '#0D47A1',
  },
});

export default HomeScreen;
