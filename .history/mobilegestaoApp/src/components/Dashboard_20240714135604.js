// mobilegestaoApp/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.entregador} - {item.cliente}</Text>
            <Text>Volume: {item.volume}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Tempo Estimado: {item.tempoEstimado}</Text>
            <Text>Tempo Em Andamento: {item.tempoEmAndamento}</Text>
            <Text>Iniciado: {item.iniciado}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dashboard;
