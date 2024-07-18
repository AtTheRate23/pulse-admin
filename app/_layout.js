import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import '../global.css'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();


    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)'
        if (isAuthenticated && !inApp) {
            router.replace('home')
        } else if (isAuthenticated == false) {
            router.replace('signIn')
        }
    }, [isAuthenticated])

    return <Slot />
}

const RootLayout = () => {
    return (
        <GestureHandlerRootView>
            <MenuProvider>
                <Provider>
                    <AuthContextProvider>
                        <MainLayout />
                    </AuthContextProvider>
                </Provider>
            </MenuProvider>
        </GestureHandlerRootView>
    )
}

export default RootLayout