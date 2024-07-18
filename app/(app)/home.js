import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

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
      const transformedMessagesChart = data?.stats?.messagesChart?.map(value => ({ value })) || [];
      console.log("messagesChart", transformedMessagesChart)
      setStats(data?.stats);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("stats", stats)

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='light' />

      <View style={{ flex: 1, padding: 20 }}>
        <LineChart data={stats?.messagesChart} />
      </View>
    </View>
  )
}

export default Home