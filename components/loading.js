import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


const Loading = ({ size }) => {
    return (
        <View style={{ height: size, aspectRatio: 1 }}>
            <LottieView className="flex-1" source={require('../assets/animations/loading.json')} autoPlay loop />
        </View>
    )
}

export default Loading