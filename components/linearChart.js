import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
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


const LinearChartStats = ({ messagesChart }) => {
    const screenWidth = Dimensions.get("window").width;
    return (
        <Surface style={styles.container}>
            <LineChart
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                    datasets: [
                        {
                            data: [2, 54, 6, 8, 8, 9, 67]
                        }
                    ]
                }}
                width={screenWidth - 20} // from react-native
                height={220}
                yAxisInterval={10} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    borderRadius: 5
                }}
            />
            <Text style={styles.title}>Total Messages</Text>
        </Surface>
    )
}

export default LinearChartStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 5
    },
    LinearStatsContainersurface: {
        flex: 1,
        padding: 8,
        height: 350,
        width: 370,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    }
})