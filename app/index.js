import { View, Image, Animated } from 'react-native'
import React, { useEffect } from 'react'

export default function StartPage() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // useEffect(() => {
    //     startAnimation();
    // }, [])


    const startAnimation = () => {
        Animated.timing(scaleAnim, {
            toValue: 2.5, // Scale the image to 1.5 times its original size
            duration: 2000, // Duration of the animation in milliseconds
            useNativeDriver: true, // Improves performance
        }).start();
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#7dd3fc] pt-40">
            <Image
                source={require('../assets/images/logo_white.png')}
                className="w-[130px] h-[130px]"
                style={{ transform: [{ scale: scaleAnim }] }}
            />
        </View>
    )
}
