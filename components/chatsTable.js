import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

const ChatsTable = ({ chats }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tableHead = ['ID', 'Avatar', 'Name', 'Total Members', 'Members', 'Total Messages', 'Created By'];

    // Calculate total pages
    const totalPages = Math.ceil(chats?.length / rowsPerPage);

    // Get the data for the current page
    const getCurrentPageData = () => {
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        return chats?.slice(start, end).map((chat, index) => [
            chat._id,
            (
                <View key={index} style={styles.avatarGroup}>
                    {chat?.avatar?.map((avatar, idx) =>
                        <Image key={idx} source={{ uri: avatar }} style={styles.avatar} />
                    )}
                </View>
            ),
            chat.name,
            chat.totalMembers,
            (
                <View key={index} style={styles.avatarGroup}>
                    {chat?.members?.map((item, idx) =>
                        <Image key={idx} source={{ uri: item?.avatar }} style={styles.avatar} />
                    )}
                </View>
            ),
            chat.totalMessages,
            (
                <View key={index} style={styles.creatorColumn}>
                    <Image source={{ uri: chat?.creator?.avatar }} style={styles.avatar} />
                    <Text>{chat?.creator?.name}</Text>
                </View>
            ),
        ]);
    };

    const tableData = getCurrentPageData();

    const widthArr = [120, 200, 150, 100, 200, 100, 200]; // Adjust width array based on your content

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={widthArr}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            ))}
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.pagination}>
                <Text style={styles.rowsPerPage}>Rows per page</Text>
                <Picker
                    selectedValue={rowsPerPage}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setRowsPerPage(itemValue);
                        setCurrentPage(0); // Reset to first page
                    }}
                >
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="20" value={20} />
                    <Picker.Item label="50" value={50} />
                </Picker>
                <Text style={styles.pageInfo}>{`${currentPage * rowsPerPage + 1}-${Math.min((currentPage + 1) * rowsPerPage, chats?.length)} of ${chats?.length}`}</Text>
                <FontAwesome5
                    name="chevron-left"
                    onPress={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                />
                <View style={{ width: 25 }} />
                <FontAwesome5
                    name="chevron-right"
                    onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '200' },
    dataWrapper: { marginTop: -1 },
    row: { height: 80, backgroundColor: '#E7E6E1' }, // Increased height for better visibility
    creatorColumn: { flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: -20, marginBottom: -10 }, // Adjust margin for overlap
    avatarGroup: { flexDirection: 'row', alignItems: 'center', position: 'relative' , marginLeft: 10},
    pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    rowsPerPage: { fontSize: 12 },
    pageInfo: { marginHorizontal: 20, fontSize: 12 },
    picker: { height: 50, width: 100 }
});

export default ChatsTable;
