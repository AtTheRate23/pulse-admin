import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts'
import { G, Text as SVGText } from 'react-native-svg';

const CircularStats = ({ stats }) => {
    const data = [
        {
            key: 1,
            amount: 345,
            svg: { fill: '#3498db' },
            label: 'Groups',
        },
        {
            key: 2,
            amount: 43,
            svg: { fill: '#e74c3c' },
            label: 'Users',
        }
    ];

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, data } = slice;
            return (
                <G key={index}>
                    <SVGText
                        x={labelCentroid[0]}
                        y={labelCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={16}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.label}
                    </SVGText>
                </G>
            );
        });
    };

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
                        <FontAwesome name="user" size={24} color="black" />
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
                        <FontAwesome name="users" size={24} color="black" />
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
                        <MaterialCommunityIcons name="android-messages" size={24} color="black" />
                        <Text>Messages</Text>
                    </View>
                </Surface>
            </View>
            <View style={styles.circulatStatsContainer}>
                <Surface style={styles.CircleStatsContainersurface} elevation={4}>
                    <Text style={styles.chartTitle}>Total Groups and Users</Text>
                    <PieChart
                        style={{ height: 200 }}
                        data={data}
                        valueAccessor={({ item }) => item.amount}
                        outerRadius={'95%'}
                        innerRadius={'45%'}
                        labelRadius={'60%'}
                    >
                        <Labels />
                    </PieChart>
                </Surface>
            </View>
        </View>
    )
}

export default CircularStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    circulatStatsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 15,
    },
    circularStatsContainersurface: {
        flex: 1,
        padding: 10,
        height: 150,
        width: 100,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 10,
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
        fontSize: 24,
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
    CircleStatsContainersurface: {
        flex: 1,
        padding: 8,
        height: 350,
        width: 370,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})