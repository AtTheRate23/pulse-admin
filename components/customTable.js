import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const CustomTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 20]);
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
                        <DataTable.Title style={{ width: 30 }}>Avatar</DataTable.Title>
                        <DataTable.Title style={{ width: 60 }}>Name</DataTable.Title>
                        <DataTable.Title style={{ width: 50 }}>Username</DataTable.Title>
                        <DataTable.Title style={{ width: 50 }}>Groups</DataTable.Title>
                        <DataTable.Title style={{ width: 50 }}>Friends</DataTable.Title>
                    </DataTable.Header>

                    {data.slice(from, to).map((item) => (
                        <DataTable.Row key={item._id} style={{ height: 80 }}>
                            <DataTable.Cell style={{ width: 100 }}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            </DataTable.Cell>
                            <DataTable.Cell style={{ width: 150 }}>{item.name}</DataTable.Cell>
                            <DataTable.Cell style={{ width: 150 }}>{item.username}</DataTable.Cell>
                            <DataTable.Cell style={{ width: 100 }}>{item.groups}</DataTable.Cell>
                            <DataTable.Cell style={{ width: 100 }}>{item.friends}</DataTable.Cell>
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
    avatar: { width: 50, height: 50, borderRadius: 50 },
});
export default CustomTable;