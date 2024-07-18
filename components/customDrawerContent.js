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
        const response = await logout();
        if (response.ok) {
            alert(response.message)
        } else {
            alert(response.message)
        }
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
                            contentFit: 'cover',
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
            <View style={{ justifyContent: 'flex-end' }}>
                <View
                    style={{
                        padding: 20,
                    }}
                    className="self-end"
                >
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name='logout'
                                size={24}
                                color='black'
                            />
                            <Text className="text-[16px] text-center font-semibold">Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        padding: 20,
                        borderTopColor: '#dde3fe',
                        borderTopWidth: 2,
                        paddingBottom: 20 + bottom,
                        alignItems: 'center'
                    }}
                >
                    <Text className="text-[14px]">©️ 2023 Pulse. All rights reserved.</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomDrawerContent