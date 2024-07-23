import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Surface } from 'react-native-paper';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};


const PieChartStats = ({ stats }) => {
    const screenWidth = Dimensions.get("window").width;
    const data = [
        {
            name: "Groups",
            population: stats?.totalChats,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Users",
            population: stats?.totalUsers,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    return (
        <Surface style={styles.container}>
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
            />
            <Text style={styles.title}>Total Users and Groups</Text>
        </Surface>
    )
}

export default PieChartStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    }
})