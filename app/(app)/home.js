import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
import ChatList from '../../components/chatList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDocs, query, where } from 'firebase/firestore';
import { usersCollection } from '../../firebaseConfig';

const Home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.uid)
      getUsers();
  }, [])

  const getUsers = async () => {
    const q = query(usersCollection, where('userId', '!=', user?.uid));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    console.log('got the users data', data);
    setUsers(data);
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='light' />
      {
        users.length > 0 ? (
          <ChatList users={users} />
        ) : (
          <View className="flex items-center" style={{ top: hp(30) }} >
            <ActivityIndicator size={'large'} />
          </View>
        )
      }
    </View>
  )
}

export default Home