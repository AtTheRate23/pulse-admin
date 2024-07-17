import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { blurhash } from '../utils/common';

const ios = Platform.OS == 'ios';
const HomeHeader = () => {
    const { top } = useSafeAreaInsets();
    const { logout } = useAuth();

    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row px-5 pb-6 shadow h-[120px] bg-[#38bdf8] rounded-b-[20px] justify-between">
            <StatusBar style='dark' />
            <View className="flex-row justify-between items-center gap-2">
                <Image
                    style={{ height: hp(6.5), aspectRatio: 1, borderRadius: 100 }}
                    source="https://res.cloudinary.com/reactcloudinary/image/upload/v1719607084/k1mf59wxm8kfx7vobcuf.png"
                    placeholder={blurhash}
                    transition={1000}
                />
                <Text style={{ fontSize: hp(3) }} className="font-semibold text-white">Pulse</Text>
            </View>
            <View className="flex justify-center items-center">
                <AntDesign name="menu-unfold" size={24} color="white" />
            </View>
        </View>
    )
}

export default HomeHeader