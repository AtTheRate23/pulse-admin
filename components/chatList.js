import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './chatItem'
import { useRouter } from 'expo-router';

const ChatList = ({ users }) => {
    const router = useRouter();
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: 18 }}
                keyExtractor={item => Math.random()}
                renderItem={({ item, index }) => (
                    <ChatItem
                        noBorder={index + 1 == users.length}
                        router={router}
                        item={item}
                        index={index}
                    />
                )}
                // ListHeaderComponent={() => <Text>Chat List</Text>}
                // ListFooterComponent={() => <Text>End of Chat List</Text>}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default ChatList