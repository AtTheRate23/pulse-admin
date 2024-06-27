import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View className="text-2xl justify-center items-center">
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={handleLogout}
        className="text-center p-4 text-[16px] text-white"
        color="red"
      />
    </View>
  )
}

export default Home