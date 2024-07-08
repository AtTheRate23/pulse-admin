import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Image } from 'expo-image';


const ChatRoom = () => {
  const item = useLocalSearchParams();
  const { user } = useAuth(); // currently logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([])
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '100%'], []);

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

  const handleHeaderClick = () => {
    bottomSheetRef.current?.snapToIndex(0); // Adjust the snap point index as needed
  };

  return (
    <>
      <View className="flex-1 bg-neutral-200 border border-b-2 border-neutral-300 shadow-2xl">
        <StatusBar style='light' />
        <ChatRoomHeader user={item} router={router} handleHeaderClick={handleHeaderClick} />
        {/* <View className="h-3 border-b border-neutral-300" /> */}
        {/* users details and profile pic */}
        <View
          style={{
            height: hp(80)
          }}
          className="flex-col items-center gap-3 mt-2 pb-2"
        >
          <Image
            source={{ uri: item?.profilePic }}
            style={{ height: hp(45), aspectRatio: 1, borderRadius: 30 }}
          />


        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#ccfbf1' }}
      >
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
      </BottomSheet>
    </>
  )
}

export default ChatRoom