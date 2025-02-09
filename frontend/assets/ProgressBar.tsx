import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
    score: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ score }) => {
    const getProgressColor = (score: number) => {
        if (score < 500) return "red";
        if (score < 600) return "yellow";
        if (score < 700) return "lightgreen";
        return "green";
    };

    return (
        <View style={progressBarStyles.container}>
            <View
                style={[
                    progressBarStyles.progress,
                    {
                        width: `${(score / 800) * 100}%`,
                        backgroundColor: getProgressColor(score),
                    },
                ]}
            />
        </View>
    );
};

const progressBarStyles = StyleSheet.create({
    container: {
        width: "90%",
        height: 20,
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 20,
    },
    progress: {
        height: "100%",
        borderRadius: 10,
    },
});

export default ProgressBar;
