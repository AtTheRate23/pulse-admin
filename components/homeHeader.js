import { Platform, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { StatusBar } from 'expo-status-bar';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import MenuItem from './customMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';
const HomeHeader = () => {
    const { top } = useSafeAreaInsets();
    const { user, logout } = useAuth();
    // console.log("user: ", user)

    const handleProfile = () => {
        console.log("Profile clicked")
    }
    const handleLogOut = async () => {
        await logout();
    }
    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row px-5 pb-6 shadow h-[100px] bg-[#38bdf8] rounded-b-[20px] justify-between">
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
                <Menu>
                    <MenuTrigger >
                        <Image
                            style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profilePic}
                            placeholder={blurhash}
                            transition={1000}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainerStyle: {
                                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                borderRadius: 10,
                                borderCurve: 'continuous',
                                padding: 10,
                                marginTop: 40,
                                marginLeft: -20,
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 0, height: 0},
                                width: 160
                            }
                        }}
                    >
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#737373" />}
                        />
                        <Divider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogOut}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color="#737373" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () => {
    return (
        <View className="p-[1px] w-full bg-neutral-200" />
    )
}

export default HomeHeader