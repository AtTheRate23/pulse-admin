import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";


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

        {/* Card */}
        <View style={styles.card}>

          {/* Header */}
          <View >
            <Text >
              Messages
            </Text>
          </View>

          {/* Content */}
          <View>
            {/* <LineChart
              data={{
                datasets: [
                  {
                    data: stats?.messagesChart,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                  }
                ],
              }}
              // width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            /> */}
            <Text style={{ marginBottom: 10, marginTop: 10 }}>Linear Chart</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: '97%',
    // height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home