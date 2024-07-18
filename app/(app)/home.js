import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";
import { Surface } from 'react-native-paper';


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const Home = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT;
  const [stats, setStats] = useState({});

  const screenWidth = Dimensions.get("window").width;

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

        <Surface style={styles.surface} elevation={4}>
          <Text>Surface</Text>
        </Surface>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  surface: {
    padding: 8,
    height: 350,
    width: '95%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home