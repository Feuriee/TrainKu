import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Import hook useAuth

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth(); // Menggunakan context auth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            if (Platform.OS === 'web') {
                window.alert('Harap isi email dan password');
            } else {
                Alert.alert('Peringatan', 'Harap isi email dan password');
            }
            return;
        }

        // Menggunakan fungsi login dari context
        const result = login(email, password);

        if (result.success) {
            // Navigasi berdasarkan role
            if (result.role === 'admin') {
                navigation.replace('Admin'); // Arahkan ke halaman admin
            } else {
                navigation.replace('Home'); // Arahkan ke halaman user biasa
            }
        } else {
            if (Platform.OS === 'web') {
                window.alert('Email atau password salah!');
            } else {
                Alert.alert('Login Gagal', 'Email atau password salah');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login ke TrainKu</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={styles.note}>
                        Belum punya akun?
                        <TouchableOpacity>
                            <Text onPress={() => console.log('Navigasi ke Register')} style={styles.linkText}> buat disini.</Text>
                        </TouchableOpacity>
                    </Text>
                </View>

            </View>
        </View>
    );
};

// styles tetap sama
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh', // ⬅️ khusus untuk web
    },
    form: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#1976D2',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#1976D2',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    note: {
        marginTop: 20,
        fontSize: 12,
        color: '#777',
    },
    linkText: {
        fontSize: 14,
        color: '#3b82f6', // warna biru
        fontWeight: 'bold',
    },
});

export default LoginScreen;
