import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import PieChartStats from './pieChartStats';

const CircularStats = ({ stats }) => {

    return (
        <View style={styles.container}>
            <View style={styles.circulatStatsContainer}>
                <Surface style={styles.circularStatsContainersurface} elevation={4}>
                    <View style={styles.ring}>
                        <View style={styles.content}>
                            <Text style={styles.value}>{stats?.totalUsers}</Text>
                        </View>
                    </View>
                    <View style={styles.iconsNameContainer}>
                        <FontAwesome name="user" size={22} color="black" />
                        <Text>Users</Text>
                    </View>
                </Surface>
                <Surface style={styles.circularStatsContainersurface} elevation={4}>
                    <View style={styles.ring}>
                        <View style={styles.content}>
                            <Text style={styles.value}>{stats?.totalChats}</Text>
                        </View>
                    </View>
                    <View style={styles.iconsNameContainer}>
                        <FontAwesome name="users" size={22} color="black" />
                        <Text>Chats</Text>
                    </View>
                </Surface>
                <Surface style={styles.circularStatsContainersurface} elevation={4}>
                    <View style={styles.ring}>
                        <View style={styles.content}>
                            <Text style={styles.value}>{stats?.totalMessages}</Text>
                        </View>
                    </View>
                    <View style={styles.iconsNameContainer}>
                        <MaterialCommunityIcons name="android-messages" size={22} color="black" />
                        <Text>Messages</Text>
                    </View>
                </Surface>
            </View>
            <PieChartStats stats={stats} />
        </View>
    )
}

export default CircularStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 5,
        borderRadius: 5
    },
    circulatStatsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        width: '95%',
        gap: 10
    },
    pieChartStatsContainer: {
        width: '95%',
        height: 200,
        marginTop: 10,
        borderRadius: 5
    },
    circularStatsContainersurface: {
        flex: 1,
        height: 130,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    ring: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 7,
        borderColor: '#3498db', // Ring color
        backgroundColor: 'transparent', // Transparent background to show the ring
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3498db',
    },
    iconsNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 10
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})