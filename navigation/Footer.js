// components/Footer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© TrainKu 2025 - All rights reserved.</Text>
      <View style={styles.links}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Privasi')}>
          <Text style={styles.link}>Kebijakan Privasi</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('About')}>
          <Text style={styles.link}>Tentang Kami</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Hubungi')}>
          <View style={styles.contactLink}>
            <Ionicons name="call-outline" size={16} color="#fff" style={styles.icon} />
            <Text style={styles.link}>Kontak</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#007bff', 
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  link: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
});

export default Footer;
