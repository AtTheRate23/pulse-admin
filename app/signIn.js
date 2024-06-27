import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../components/loading';
import { useAuth } from '../context/authContext';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);

    const { login } = useAuth()

    const [borderColors, setBorderColors] = useState({
        email: 'black',
        password: 'black'
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const router = useRouter();

    const handleInputChane = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        })
        if (value === '') {
            setValid(false);
            setBorderColors({
                ...borderColors,
                [name]: 'red',
            })
        }
        else {
            setValid(true);
            setBorderColors({
                ...borderColors,
                [name]: 'green',
            })
        }
    }

    const handleLogin = async () => {
        try {
            // Login Logic
            setLoading(true)
            if (valid) {
                const response = await login(formData.email, formData.password)
                setLoading(false)
                if (!response.success) {
                    alert("Sign in", response.msg)
                }
            }
        } catch (error) {
            throw new Error
        }
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <StatusBar style='dark' />
                <View className=" flex-1 items-stretch h-full">
                    <View className="pt-30 bg-[#38bdf8] rounded-b-[30px]">
                        <View className=" mt-10 flex justify-center items-center">
                            <Image
                                source={require('../assets/images/logo_white.png')}
                                className="w-[130px] h-[130px]"
                            />
                            <Text className='text-center -mt-4 pb-3 text-[20px] text-white'>Pulse</Text>
                        </View>
                        <Text className='text-center pb-4 text-[16px] text-white'>❤️Stay Connected With Your Loved One's❤️</Text>
                    </View>
                    <View className="body-container flex justify-center items-center mt-5">
                        <Text className="text-[25px] tracking-wider text-black font-bold">Sign In</Text>
                        <Text className="text-[16px] text-black font-semibold">Enter Your Credentials for Sign In</Text>
                        <View className="flex-row m-4 w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl" style={{ borderColor: borderColors.email }}>
                            <Fontisto name="email" size={24} color="black" className="self-center pl-4 pr-4" />
                            <TextInput
                                id='email'
                                placeholder='Enter your email address'
                                placeholderTextColor={'black'}
                                onChangeText={value => handleInputChane(value, 'email')}
                                className="flex-1 self-center font-semibold text-neutral-700"
                            />
                        </View>
                        <View className="flex-row m-4 w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl" style={{ borderColor: borderColors.password }}>
                            <Feather name="lock" size={24} color="black" className="self-center pl-4 pr-4" />
                            <TextInput
                                id='password'
                                placeholder='Enter your password'
                                placeholderTextColor={'black'}
                                onChangeText={value => handleInputChane(value, 'password')}
                                className="flex-1 self-center font-semibold text-neutral-700"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View className="flex flex-row ml-5 mr-5 mb-4">
                        <Text className="text-black font-semibold">Forgot Password? {" "}</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-500 font-semibold">Click Here</Text>
                        </TouchableOpacity>
                    </View>

                    {/* button for signIn */}
                    <View className="bg-[#38bdf8] w-[90%] h-[50px] rounded-md flex justify-center items-center self-center">
                        {
                            loading ? (
                                <ActivityIndicator size={'large'} />
                            ) : (
                                <TouchableOpacity
                                    onPress={() => setLoading(true)}
                                >
                                    <Text className="text-white text-[18px] font-bold rounded-xl">Sign In</Text>
                                </TouchableOpacity>)
                        }
                    </View>
                    <View className="flex flex-row justify-center items-center mt-2">
                        <Text className="text-black font-semibold">Don't have a account ? {" "}</Text>
                        <TouchableOpacity
                            onPress={() => router.replace('signUp')}
                        >
                            <Text className="text-blue-500 font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* social media icons container */}
                <View className="bg-[#38bdf8] flex flex-end h-[120px] rounded-t-[110px] absolute bottom-0 w-full">
                    <Text className='text-center text-[16px] text-white pt-2'>Or Sign in With</Text>
                    <View className="flex flex-row mt-3 justify-center">
                        <View
                            className="rounded-xl p-2 bg-white shadow-md mx-2 w-[50px] h-[50px]"
                        >
                            <TouchableOpacity>
                                <AntDesign name="google" size={35} color="red" />
                            </TouchableOpacity>
                        </View>
                        <View
                            className="rounded-xl p-2 bg-white shadow-md mx-2 w-[50px] h-[50px]"
                        >
                            <TouchableOpacity>
                                <AntDesign name="instagram" size={35} color="pink" />
                            </TouchableOpacity>
                        </View>
                        <View
                            className="rounded-xl p-2 bg-white shadow-md mx-2 w-[50px] h-[50px]"
                        >
                            <TouchableOpacity>
                                <AntDesign name="twitter" size={35} color="blue" />

                            </TouchableOpacity>
                        </View>
                        <View
                            className="rounded-xl p-2 bg-white shadow-md mx-2 w-[50px] h-[50px]"
                        >
                            <TouchableOpacity>
                                <AntDesign name="github" size={35} color="black" />

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </KeyboardAvoidingView >
    )
}

export default SignIn