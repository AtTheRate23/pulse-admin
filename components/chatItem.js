import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash, formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatItem = ({ currentUser, noBorder, router, item, index }) => {
    const [lastMessage, setLastMessage] = useState(undefined)
    useEffect(() => {

        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null)
        })

        return unsub;
    }, [])

    const openChatRoom = () => {
        router.push({ pathname: `/chatRoom`, params: item })
    }

    const renderTime = () => {
        if (!lastMessage) return null
        let date = lastMessage?.createdAt;
        return formatDate(new Date(date?.seconds * 1000))
        
    }

    const renderLastMessage = () => {
        if (typeof lastMessage == 'undefined') return 'Loading...';
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return "You: " + lastMessage?.text;
            return lastMessage?.text;
        } else {
            return "Say Hi 👋"
        }
    }
    return (
        <TouchableOpacity onPress={openChatRoom}>
            <View className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${!noBorder ? 'border-b border-b-neutral-200' : ''}`}>
                <Image
                    style={{ height: hp(6.5), width: hp(6), borderRadius: 100 }}
                    source={item?.profilePic}
                    placeholder={blurhash}
                    transition={1000}
                />
                {/* name and last message */}
                <View className="flex-1 gap-1">
                    <View className="flex-row justify-between">
                        <Text className='text-lg font-medium text-neutral-700'>{item?.username}</Text>
                        <Text className='text-xs font-medium text-neutral-400'>{
                            renderTime()
                        }
                        </Text>
                    </View>
                    <Text className='text-sm font-medium text-neutral-400'>{
                        renderLastMessage()
                    }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem