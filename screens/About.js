import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icon

const teamMembers = [
  {
    id: 1,
    name: 'Ghazi Al Ghifari',
    instagram: 'https://www.instagram.com/gzhii._/',
    github: 'https://github.com/KiaiAji',
  },
  {
    id: 2,
    name: 'I Nyoman Dimas Kresna Adryan',
    instagram: 'https://www.instagram.com/dimaskresna.a?igsh=MWs3bHFjM2tkcWZkNQ%3D%3D&utm_source=qr',
    github: 'https://github.com/Dimasadryan19?tab=overview&from=2025-03-01&to=2025-03-31',
  },
  {
    id: 3,
    name: 'Merischa Theresia Hutauruk',
    instagram: 'https://www.instagram.com/merhtk.15?igsh=dDF1NHduMTVvbWhq',
    github: 'https://github.com/merischahutauruk',
  },
  {
    id: 4,
    name: 'Yohanes Adi Prasetya',
    instagram: 'https://instagram.com/yhanes_adp',
    github: 'https://github.com/Feuriee',
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
        TrainKu adalah aplikasi mobile booking tiket kereta api yang dibuat untuk memenuhi tugas akhir mata kuliah Proyek Pemrograman Web. 
        Aplikasi ini dibuat pada tahun 2025 dengan tujuan memudahkan pengguna dalam memesan tiket, mengecek jadwal kereta, 
        serta mengelola ketersediaan tiket melalui panel admin.
      </Text>

      <Text style={styles.subtitle}>Anggota Kelompok</Text>

      {teamMembers.map(member => (
        <View key={member.id} style={styles.memberContainer}>
          <Text style={styles.memberName}>{member.name}</Text>
          <View style={styles.linkGroup}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => openLink(member.instagram)}
            >
              <FontAwesome name="instagram" size={28} color="#E1306C" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => openLink(member.github)}
            >
              <FontAwesome name="github" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
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
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  memberContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  linkGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
  },
  separator: {
    height: 1,
    backgroundColor: '#cbd5e1',
    width: '80%',
    marginTop: 20,
  },
});

export default AboutScreen;
