import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/authContext';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [show, setShow] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const toggleShowPassword = () => {
        setShow(!show);
    }

    const { login } = useAuth();

    const [borderColors, setBorderColors] = useState({
        secretKey: 'black',
    })
    const [formData, setFormData] = useState({
        secretKey: ''
    })

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
                const response = await login(formData?.secretKey)
                setLoading(false)
                setFormData({
                    secretKey: '',
                })
                alert(response.message)
                if (!response.success) {
                    alert(response.message)
                }
            }
        } catch (error) {
            throw new Error
        }
    }

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <StatusBar style='dark' />
                <View className=" flex-1 items-stretch h-full gap-2">
                    <View className="pt-30 bg-[#38bdf8] rounded-b-[30px]">
                        <View className=" mt-10 flex justify-center items-center">
                            <Image
                                source={require('../assets/images/logo_white.png')}
                                className="w-[130px] h-[130px]"
                            />
                            <Text className='text-center -mt-4 pb-3 text-[20px] text-white'>Pulse</Text>
                        </View>
                        <Text className='text-center pb-4 text-[16px] text-white'>❤️ Stay Connected With Your Loved One's ❤️</Text>
                    </View>
                    <View className="body-container flex justify-center items-center mt-5 gap-2">
                        <Text className="text-[25px] tracking-wider text-black font-bold">Admin Sign In</Text>
                        <Text className="text-[16px] text-black font-semibold">Enter Your Secret Key for Sign In</Text>
                        <View className="flex-row m-4 w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl" style={{ borderColor: borderColors.password }}>
                            <Feather name="lock" size={24} color="black" className="self-center pl-4 pr-4" />
                            <TextInput
                                id='secretKey'
                                placeholder='Enter your secret key'
                                placeholderTextColor={'black'}
                                onChangeText={value => handleInputChane(value, "secretKey")}
                                className="flex-1 self-center font-semibold text-neutral-700"
                                secureTextEntry={show}
                            />
                            <Feather
                                name={show ? 'eye-off' : 'eye'}
                                size={24}
                                color="black"
                                className="self-center pl-4 pr-4"
                                onPress={toggleShowPassword}
                            />
                        </View>
                    </View>

                    {/* button for signIn */}
                    <TouchableOpacity
                        onPress={handleLogin}
                    >
                        <View className="bg-[#38bdf8] w-[90%] h-[50px] rounded-md flex justify-center items-center self-center">
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} />
                                ) : (
                                    <View>
                                        <Text className="text-white text-[18px] font-bold rounded-xl">Sign In</Text>
                                    </View>)
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {!keyboardVisible && (
                <View className="absolute bottom-0 w-full">
                    <StatusBar style='light-content' />
                    <View className="bg-[#38bdf8] h-[40px] flex-row justify-center items-center rounded-tl-2xl rounded-tr-2xl w-full">
                        <Text className='text-center text-[16px] text-black'>©️ 2023 Pulse. All Rights Reserved.</Text>
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    )
}


export default SignIn