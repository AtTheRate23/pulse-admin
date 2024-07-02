import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

const ChatItem = ({ noBorder, router, item, index }) => {
    const openChatRoom = () => {
        router.push({ pathname: `/chatRoom`, params: item })
    }
    return (
        <TouchableOpacity onPress={openChatRoom}>
            <View className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${!noBorder ? 'border-b border-b-neutral-200' : ''}`}>
                <Image
                    style={{ height: hp(6.5), width: hp(6), borderRadius: 100 }}
                    source={item?.profilePic}
                    placeholder={blurhash}
                    transition={1000}
                />
                {/* name and last message */}
                <View className="flex-1 gap-1">
                    <View className="flex-row justify-between">
                        <Text className='text-lg font-medium text-neutral-700'>{item?.username}</Text>
                        <Text className='text-xs font-medium text-neutral-400'>12:30 PM</Text>
                    </View>
                    <Text className='text-sm font-medium text-neutral-400'>Hello Aaadi</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem