import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Kamu telah keluar dari aplikasi.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>
      <Text style={styles.item}>Nama: John Doe</Text>
      <Text style={styles.item}>Email: johndoe@mail.com</Text>
      <Text style={styles.item}>Riwayat Pembelian: 3 Tiket</Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
