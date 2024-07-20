import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const CustomTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([8, 10, 20, 50]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView horizontal>
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.headerCell}>Avatar</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Name</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Username</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Groups</DataTable.Title>
                        <DataTable.Title style={styles.headerCell}>Friends</DataTable.Title>
                    </DataTable.Header>

                    {data.slice(from, to).map((item) => (
                        <DataTable.Row key={item._id} style={styles.row}>
                            <DataTable.Cell style={styles.cell}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.name}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.username}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.groups}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.friends}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(data.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${data.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerCell: {
        width: 120, // Adjust the width as needed
        paddingHorizontal: 40, // Add horizontal padding
        justifyContent: 'center',
    },
    cell: {
        width: 120, // Adjust the width as needed
        paddingHorizontal: 8, // Add horizontal padding
        alignItems: 'center',
    },
    row: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center', // Center items vertically in the row
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default CustomTable;
