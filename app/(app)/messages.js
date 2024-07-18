import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { Image } from 'expo-image';

const Messages = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    FetchMessages()
  }, []);

  const FetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiEndpoint}/admin/messages`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setMessages(data?.messages)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching users: {error}</Text>
      </View>
    );
  }


  // Column Names
  const colNames = ['_id', 'content'];

  // Column Settings
  const colSettings = [
    { name: '_id', type: COL_TYPES.STRING, width: '20%' },
    { name: 'content', type: COL_TYPES.STRING, width: '30%' },
    // { name: 'createdAt', type: COL_TYPES.STRING, width: '20%' },
    // { name: 'sender', type: COL_TYPES.STRING, width: '20%' },
    // { name: 'groupChat', type: COL_TYPES.STRING, width: '10%' },
  ];

  return (
    <View style={styles.container}>
      <DataTable
        data={messages}
        colNames={colNames}
        colSettings={colSettings}
        noOfPages={2}
        backgroundColor={'rgba(113,113,87,0.2)'}
        headerLabelStyle={{ color: 'black', fontSize: 12 }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});


export default Messages