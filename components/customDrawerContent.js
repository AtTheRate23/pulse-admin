import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../context/authContext'

const CustomDrawerContent = (props) => {
    const { top, bottom } = useSafeAreaInsets();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props} scrollEnabled={false}
                contentContainerStyle={{ backgroundColor: '#dde3fe' }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        marginBottom: bottom
                    }}
                >
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            resizeMode: 'cover',
                            padding: 20
                        }}
                        source={{ uri: 'https://res.cloudinary.com/reactcloudinary/image/upload/v1719602485/p1aepzlkqusxhjmw9ejf.jpg' }}
                    />
                    <Text className="text-[18px] mt-2 font-bold">Admin</Text>
                </View>
                <View className="bg-white pt-[10px]">
                    <DrawerItemList {...props}>
                    </DrawerItemList>
                </View>
            </DrawerContentScrollView>
            {/* Footer area */}
            <View
                style={{
                    padding: 20,
                    paddingBottom: 20 + bottom
                }}
            >
                {/* Logout button */}
                <TouchableOpacity onPress={handleLogout}>
                    <View className="flex-row self-end">
                        <MaterialCommunityIcons name='logout'
                            size={24}
                            color='black'
                        />
                        <Text className="text-[16px] text-center font-bold">Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    borderTopColor: '#dde3fe',
                    borderTopWidth: 2,
                    padding: 20,
                    paddingBottom: 20 + bottom
                }}
            >
                <Text className="text-2xl p-20">©️ 2023 Pulse. All rights reserved.</Text>
            </View>
        </View>
    )
}

export default CustomDrawerContent