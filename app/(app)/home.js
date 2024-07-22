import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CircularStats from '../../components/circularStats';
import LinearChartStats from '../../components/linearChart';

const Home = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT;
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/admin/stats`);
      const data = await response.json();
      setStats(data?.stats);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("stats", stats)

  return (
    <ScrollView>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <CircularStats stats={stats} />
        <LinearChartStats messagesChart={stats?.messagesChart} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20
  }
});

export default Home