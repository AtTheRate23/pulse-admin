import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageItem from './messageItem';

const MessageList = ({ messages, currentUser, scrollViewRef }) => {
    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
        >
            {
                messages?.map((message, index) => {
                    return (
                        <MessageItem message={message} currentUser={currentUser} key={index} />
                    )
                })
            }
        </ScrollView>
    )
}

export default MessageList