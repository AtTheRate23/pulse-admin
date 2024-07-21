import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MessagesTabel from '../../components/messagesTable';

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


  return (
    <ScrollView style={styles.container}>
      <MessagesTabel messages={messages} />
    </ScrollView>
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