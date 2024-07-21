import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Button } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';

const UsersTable = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tableHead = ['ID', 'Avatar', 'Name', 'UserName', 'Friends', 'Groups'];

    // Calculate total pages
    const totalPages = Math.ceil(users?.length / rowsPerPage);

    // Get the data for the current page
    const getCurrentPageData = () => {
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        return users?.slice(start, end)?.map(user => [
            user._id,
            (
                <View style={styles.senderColumn}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                </View>
            ),
            user.name,
            user.username,
            user.friends,
            user.groups
        ]);
    };

    const tableData = getCurrentPageData();

    const widthArr = [120, 80, 100, 230, 120, 100]; // Adjust width array based on your content

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {tableData?.map((rowData, index) => (
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
                <Text style={styles.pageInfo}>{`${currentPage * rowsPerPage + 1}-${Math.min((currentPage + 1) * rowsPerPage, users?.length)} of ${users?.length}`}</Text>
                <FontAwesome5
                    name="chevron-left"
                    onPress={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                />
                <View style={{width: 25}} />
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
    row: { height: 60, backgroundColor: '#E7E6E1' },
    senderColumn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    rowsPerPage: { fontSize: 14 },
    pageInfo: { marginHorizontal: 20, fontSize: 14 },
    picker: { height: 50, width: 100 }
});

export default UsersTable;
