import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DataTable, { COL_TYPES } from 'react-native-datatable-component';

const Users = () => {
  const apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT
  const [users, setUsers] = useState([])
  // Fetch users from API

  useEffect(() => {
    FetchUsers()
  }, []);

  const FetchUsers = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/admin/users`)
      // check if response is ok or not
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setUsers(data?.users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  return (
    <View>
      <DataTable
        data={users} // list of objects
        colNames={['avatar', 'name', 'username', 'groups', 'friends']} //List of Strings
        colSettings={[
          { name: 'avatar', type: COL_TYPES.STRING, width: '40%' },
          { name: 'name', type: COL_TYPES.STRING, width: '30%' },
          { name: 'username', type: COL_TYPES.STRING, width: '30%' },
          { name: 'groups', type: COL_TYPES.INT, width: '20%' },
          { name: 'friends', type: COL_TYPES.INT, width: '20%' } //Number Column
        ]}//List of Objects
        backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
        headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
      />
    </View>
  )
}

export default Users