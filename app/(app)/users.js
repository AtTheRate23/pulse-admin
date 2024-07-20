import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import CustomTable from '../../components/customTable';

const Users = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    FetchUsers()
  }, []);

  const FetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiEndpoint}/admin/users`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setUsers(data?.users)
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
  const colNames = ['_id', 'avatar', 'name', 'username', 'friends', 'groups'];

  return (
    <ScrollView style={styles.container}>
      <CustomTable data={users} columns={colNames} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Users;
