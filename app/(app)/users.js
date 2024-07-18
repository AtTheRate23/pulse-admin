import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';

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

  const renderAvatar = (avatar) => (
    <Image source={{ uri: avatar }} style={styles.avatar} />
  );

  const renderCell = (columnName, cellValue) => {
    console.log("columnName & cellValue", columnName, cellValue);
    if (columnName === 'avatar') {
      return renderAvatar(cellValue);
    }
    return <Text>{cellValue}</Text>;
  };

  // Column Names
  const colNames = ['_id', 'avatar', 'name', 'username', 'friends', 'groups'];

  // Column Settings
  const colSettings = [
    { name: '_id', type: COL_TYPES.STRING, width: '20%' },
    { name: 'avatar', type: COL_TYPES.STRING, width: '20%' },
    { name: 'name', type: COL_TYPES.STRING, width: '15%' },
    { name: 'username', type: COL_TYPES.STRING, width: '15%' },
    { name: 'friends', type: COL_TYPES.INT, width: '10%' },
    { name: 'groups', type: COL_TYPES.INT, width: '10%' },
  ];

  return (
    <View style={styles.container}>
      <DataTable
        data={users}
        colNames={colNames}
        colSettings={colSettings}
        noOfPages={2}
        backgroundColor={'rgba(113,113,87,0.2)'}
        headerLabelStyle={{ color: 'grey', fontSize: 12 }}
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Users;
