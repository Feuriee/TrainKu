import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');

  const handlePayment = () => {
    if (!cardNumber || !name) {
      Alert.alert('Gagal', 'Harap isi data pembayaran dengan lengkap!');
      return;
    }

    Alert.alert('Sukses', 'Pembayaran berhasil diproses!');
    setCardNumber('');
    setName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran</Text>
      <TextInput
        placeholder="Nama di Kartu"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Nomor Kartu"
        style={styles.input}
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <Button title="Bayar Sekarang" onPress={handlePayment} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default PaymentScreen;
