import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import shadow from 'leaflet/dist/images/marker-shadow.png';

const LeafletMap = ({ latitude = -3.809885, longitude = 102.265541 }) => {
  // Hanya render komponen ini di web platform
  if (Platform.OS !== 'web') return null;

  const mapRef = useRef(null);

  useEffect(() => {
    // Pastikan kode ini hanya dijalankan di browser dan L (Leaflet) tersedia
    if (typeof window !== 'undefined' && window.L) {
      // Cek jika map sudah diinisialisasi sebelumnya pada elemen ini
      if (mapRef.current && mapRef.current._leaflet_id) {
        return; // Map sudah diinisialisasi
      }

      // Inisialisasi map
      const map = window.L.map(mapRef.current).setView([latitude, longitude], 15);

      // Tambahkan tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // --- Bagian untuk menggunakan ikon kustom ---
      const customIcon = L.icon({
        iconUrl: '/marker.png',
        iconRetinaUrl: '/marker.png', 
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: shadow, 
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
      });

      window.L.marker([latitude, longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup('Kantor Customer Service')
        .openPopup();
      
      return () => {
        map.remove();
      };
    }
  }, [latitude, longitude]); // Re-run jika koordinat berubah

  return (
    <View style={{ width: '100%', height: 300 }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
};

export default LeafletMap;