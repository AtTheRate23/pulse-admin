import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/chatRoomHeader';
import MessageList from '../../components/messageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const { user } = useAuth(); // currently logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([])
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createChatRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMessages]);
    })

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updatedScrollView
    )

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, [])

  useEffect(() => {
    updatedScrollView();
  }, [messages])

  function updatedScrollView() {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  const createChatRoomIfNotExists = async () => {
    // TODO: Implement chat room creation logic here
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId: roomId,
      users: [user.userId, item?.userId],
      createdAt: Timestamp.fromDate(new Date())
    })
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId)
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        senderName: user?.username,
        profilePic: user?.profilePic,
        text: message,
        createdAt: Timestamp.fromDate(new Date())
      })

      console.log("new message Id", newDoc?.id)
    } catch (error) {
      alert('Message', error.message);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark' />
      <ChatRoomHeader user={item} router={router} />
      {/* <View className="h-3 border-b border-neutral-300" /> */}
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible rounded-tl-[25px] rounded-tr-[25px] border border-b-2 border-neutral-300">
        <View className="flex-1">
          <MessageList messages={messages} currentUser={user} scrollViewRef={scrollViewRef} />
        </View>
        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          <View className="flex-row justify-between items-center mx-3">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={value => textRef.current = value}
                placeholder='type message....'
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={{
                  height: hp(4.5),
                  width: hp(4.5),
                  borderRadius: 100,
                  backgroundColor: '#f5f5f5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: hp(1.5)
                }}
              >
                <Feather name='send' size={hp(2.7)} color='#737373' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ChatRoom