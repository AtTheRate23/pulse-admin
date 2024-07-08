import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

const ChatRoomHeader = ({ user, router, handleHeaderClick }) => {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: true,
                headerStyle: {
                    backgroundColor: '#38bdf8',
                    borderRadius: 20,
                },
                headerLeft: () => (
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name="chevron-left" size={hp(4)} color='#FFFFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleHeaderClick}>
                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={user?.profilePic}
                                    style={{ height: hp(4.5), borderRadius: 100, aspectRatio: 1 }}
                                />
                                <Text style={{ fontSize: hp(2.5) }} className="font-medium text-white">
                                    {user?.username.length > 15 ? `${user.username.slice(0, 15)}...` : user.username}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ),
                headerRight: () => (
                    <View className="flex-row items-center gap-8">
                        <TouchableOpacity>
                            <Ionicons name="call" size={hp(2.8)} color='#ffffff' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="videocam" size={hp(2.8)} color='#FFFFFF' />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

export default ChatRoomHeader