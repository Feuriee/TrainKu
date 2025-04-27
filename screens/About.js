import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';

const teamMembers = [
  {
    id: 1,
    name: 'Nama Anggota 1',
    image: require('../assets/UserProfile.jpg'), // Pastikan kamu punya file gambar ini di folder assets
    instagram: 'https://instagram.com/username1',
    github: 'https://github.com/username1',
  },
  {
    id: 2,
    name: 'Nama Anggota 2',
    image: require('../assets/UserProfile.jpg'),
    instagram: 'https://instagram.com/username2',
    github: 'https://github.com/username2',
  },
  {
    id: 3,
    name: 'Nama Anggota 3',
    image: require('../assets/UserProfile.jpg'),
    instagram: 'https://instagram.com/username3',
    github: 'https://github.com/username3',
  },
];

const AboutScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tentang Aplikasi TrainKu</Text>
      <Text style={styles.description}>
        TrainKu adalah aplikasi booking tiket kereta api yang memudahkan pengguna untuk memesan tiket dengan cepat, 
        melihat jadwal keberangkatan, serta mengatur ketersediaan tiket melalui panel admin. 
        Aplikasi ini dibuat untuk mempermudah akses transportasi berbasis mobile.
      </Text>

      <Text style={styles.subtitle}>Anggota Kelompok</Text>
      {teamMembers.map(member => (
        <View key={member.id} style={styles.card}>
          <Image source={member.image} style={styles.image} />
          <Text style={styles.name}>{member.name}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E1306C' }]}
              onPress={() => openLink(member.instagram)}
            >
              <Text style={styles.buttonText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#333' }]}
              onPress={() => openLink(member.github)}
            >
              <Text style={styles.buttonText}>GitHub</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AboutScreen;
