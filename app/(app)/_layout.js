import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeHeader from '../../components/homeHeader';
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomDrawerContent from '../../components/customDrawerContent';

export default function _layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerActiveBackgroundColor: '#5363df',
                    drawerActiveTintColor: 'fff',
                    drawerLabelStyle: { marginLeft: -20 }
                }}
            >
                <Drawer.Screen
                    name="home" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'Dashboard',
                        header: () => <HomeHeader />,
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name='home-outline' size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="chats" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Chats',
                        title: 'Chats',
                        drawerIcon: ({ size, color }) => (
                            <Entypo name='chat' size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="users" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Users',
                        title: 'Users',
                        drawerIcon: ({ size, color }) => (
                            <FontAwesome5 name='users' size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="messages" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Messages',
                        title: 'Messages',
                        drawerIcon: ({ size, color }) => (
                            <MaterialIcons name='message' size={size} color={color} />
                        )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}
