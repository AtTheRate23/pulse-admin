import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext'

const SignUp = () => {
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordMatched, setPasswordMatched] = useState(false)

  const { register } = useAuth();

  const [borderColors, setBorderColors] = useState({
    username: 'black',
    email: 'black',
    password: 'black',
    confirmPassword: 'black',
    profilePic: 'black',
  })
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  })

  console.log('formData', formData)

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

    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      console.log('password & confirm password', password, confirmPassword);
      if (password === confirmPassword) {
        setValid(true)
        setPasswordMatched(true)
      } else {
        setValid(false)
        setPasswordMatched(false)
      }
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      // console.log(result)
      const fileData = new FormData()
      fileData.append('file', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName
      });

      fileData.append('upload_preset', 'agihzmv9')

      console.log('fileData', fileData)
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/reactcloudinary/image/upload', {
          method: 'POST',
          body: fileData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await res.json();

        if (data.secure_url) {
          setLoading(false);
          setFormData({
            ...formData,
            profilePic: data.secure_url,
          });
        } else {
          // Handle error
          console.error('Failed to upload image to Cloudinary');
        }
      } catch (error) {
        // Handle error
        console.error('Error uploading image:', error);
      }

    } else {
      alert('You did not select any image.');
    }
  };

  const handleRegister = async () => {
    try {
      // Register Logic
      setLoading(true)
      const { username, email, password, confirmPassword, profilePic } = formData;
      if (valid) {
        let response = await register(username, email, password, profilePic);
        setLoading(false)

        console.log('got results:', response)
        if (!response.success) {
          alert('Sign up', response.msg)
        } else {
          router.replace('signIn')
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
          <View className="body-container flex justify-center items-center mt-4">
            <Text className="text-[25px] tracking-wider text-black font-bold">Sign Up</Text>
            <Text className="text-[16px] text-black font-semibold">Enter Your Details for Sign up</Text>
            <View className="m-4 flex-row w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl" style={{ borderColor: borderColors.username }}>
              <AntDesign name="user" size={24} color="black" className="self-center pl-4 pr-4" />
              <TextInput
                id='username'
                placeholder='Enter your username'
                placeholderTextColor={'black'}
                onChangeText={value => handleInputChane(value, 'username')}
                className="text-black font-semibold flex-1"
              />
            </View>
            <View className="m-4 flex-row w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl -mt-1" style={{ borderColor: borderColors.email }}>
              <Fontisto name="email" size={24} color="black" className="self-center pl-4 pr-4" />
              <TextInput
                id='email'
                placeholder='Enter your email address'
                placeholderTextColor={'black'}
                onChangeText={value => handleInputChane(value, 'email')}
                className="text-black font-semibold flex-1"
                keyboardType='email-address'
              />
            </View>
            <View className="m-4 flex-row w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl -mt-1" style={{ borderColor: borderColors.password }}>
              <Feather name="lock" size={24} color="black" className="self-center pl-4 pr-4" />
              <TextInput
                id='password'
                placeholder='Enter your password'
                placeholderTextColor={'black'}
                onChangeText={value => handleInputChane(value, 'password')}
                className="text-black font-semibold flex-1"
                secureTextEntry={true}
              />
            </View>
            <View className="m-4 flex-row w-[90%] bg-neutral-100 border h-[50px] border-solid rounded-xl -mt-1" style={{ borderColor: borderColors.confirmPassword }}>
              <Feather name="lock" size={24} color="black" className="self-center pl-4 pr-4" />
              <TextInput
                id='confirmPassword'
                placeholder='Re-enter your password'
                placeholderTextColor={'black'}
                onChangeText={value => handleInputChane(value, 'confirmPassword')}
                className="text-black font-semibold flex-1"
                secureTextEntry={true}
              />
              {
                formData.password !== '' && formData.confirmPassword !== '' ?
                  passwordMatched ?
                    <Ionicons name="checkmark-circle" size={24} color="green" className="self-center pr-2" />
                    :
                    <Entypo name="circle-with-cross" size={24} color="red" className="self-center pr-2" />
                  : null
              }
            </View>
          </View>
          <View className="m-5 flex flex-row justify-between">
            <View className="h-[50px] flex-row gap-2 bg-purple-300 items-center p-4 rounded-xl">
              <Entypo name="image" size={24} color="black" />
              <TouchableOpacity
                onPress={pickImageAsync}
              >
                <Text className="text-black text-[16px]">Pick Profile Pic</Text>
              </TouchableOpacity>
            </View>
            <Image
              id='profilePic'
              source={formData?.profilePic ? formData?.profilePic : require('../assets/images/person.png')}
              className="w-[110px] h-[120px] -mt-7"
            />
          </View>

          {/* button for signIn */}
          <View className="bg-[#38bdf8] w-[90%] h-[50px] rounded-xl flex justify-center items-center self-center">
            <TouchableOpacity
              onPress={handleRegister}
            >
              <Text className="text-white text-[18px]">Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row self-center items-center mt-2">
            <Text className="text-black">Already have a account ? {" "}</Text>
            <TouchableOpacity
              onPress={() => router.replace('signIn')}
            >
              <Text className="text-blue-500">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp