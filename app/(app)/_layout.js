import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '../../components/homeHeader'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function _layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="home" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                        header: () => <HomeHeader />
                    }}
                    
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}
