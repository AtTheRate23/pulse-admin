import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeHeader from '../../components/homeHeader';

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
