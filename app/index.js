import { View, Text, ActivityIndicator, Image } from 'react-native'
import React from 'react'

export default function StartPage() {
    return (
        <View
            className="flex-1 justify-center items-center bg-[#7dd3fc] pt-40">
            {/* <ActivityIndicator size='large' color='gray' /> */}
            <View className=" mt-10 flex justify-center items-center">
                <Image
                    source={require('../assets/images/logo_white.png')}
                    className="w-[130px] h-[130px]"
                />
            </View>
        </View>
    )
}
