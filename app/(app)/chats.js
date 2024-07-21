import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image';
import ChatsTable from '../../components/chatsTable';

const Chats = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    FetchChats()
  }, []);

  const FetchChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiEndpoint}/admin/chats`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setChats(data?.chats)
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


  return (
    <ScrollView style={styles.container}>
      <ChatsTable chats={chats} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Chats;
