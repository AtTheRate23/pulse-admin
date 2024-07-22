import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

const MessagesTable = ({ messages }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tableHead = ['ID', 'Content', 'Attachments', 'Sent By', 'Chat ID', 'Group Chat', 'Time'];

    // Calculate total pages
    const totalPages = Math.ceil(messages?.length / rowsPerPage);


    // Function to render attachments
    const renderAttachments = (attachments) => {
        if (!attachments) return null;
        return attachments?.map((attachment, index) => {
            const fileType = attachment?.split('.').pop().toLowerCase();

            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
                return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(attachment)}>
                        <Image source={{ uri: attachment }} style={styles.attachmentImage} />
                    </TouchableOpacity>
                );
            } else if (['mp4', 'mov', 'avi'].includes(fileType)) {
                return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(attachment)}>
                        <Video
                            source={{ uri: attachment }}
                            style={styles.attachmentVideo}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                        />
                    </TouchableOpacity>
                );
            } else if (['doc', 'docx', 'pdf'].includes(fileType)) {
                return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(attachment)}>
                        <FontAwesome5 name="file-alt" size={24} color="black" style={styles.attachmentIcon} />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(attachment)}>
                        <Text style={styles.attachmentText}>Unknown file type</Text>
                    </TouchableOpacity>
                );
            }
        });
    };

    // Get the data for the current page
    const getCurrentPageData = () => {
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        return messages?.slice(start, end).map(message => [
            message._id,
            message.content,
            message.attachments ? renderAttachments(message.attachments) : 'No',
            (
                <View style={styles.senderColumn}>
                    <Image source={{ uri: message.sender.avatar }} style={styles.avatar} />
                    <Text>{message.sender.name}</Text>
                </View>
            ),
            message.chat._id,
            message.chat.groupChat ? 'True' : 'False',
            new Date(message.createdAt).toLocaleString()
        ]);
    };

    const tableData = getCurrentPageData();

    const widthArr = [120, 200, 100, 230, 120, 100, 160]; // Adjust width array based on your content

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
                <Text style={styles.rowsPerPage} >Rows per page</Text>
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
                <Text style={styles.pageInfo}>{`${currentPage * rowsPerPage + 1}-${Math.min((currentPage + 1) * rowsPerPage, messages?.length)} of ${messages?.length}`}</Text>
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
    header: { height: 50, backgroundColor: '#22d3ee' },
    text: { textAlign: 'center', fontWeight: '400' },
    dataWrapper: { marginTop: -1 },
    row: { height: 60, backgroundColor: '#E7E6E1' },
    senderColumn: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    rowsPerPage: { fontSize: 14 },
    pageInfo: { marginHorizontal: 20, fontSize: 14 },
    picker: { height: 50, width: 100 }
});

export default MessagesTable;
