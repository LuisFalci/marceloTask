import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/ThemeProvider';

export default function Category() {
    const { darkModeEnabled } = useContext(ThemeContext);

    let categories = ["Tarefas IF", "Academia"];

    return (
        <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
            <View style={[styles.titleContainer, darkModeEnabled && styles.darkModeTitleContainer]}>
                <Text style={[styles.title, darkModeEnabled && styles.darkModeTitle]}>Minhas Categorias</Text>
            </View>
            {categories.map((category, index) => (
                <View style={[styles.taskContainer, darkModeEnabled && styles.darkModeTaskContainer]} key={index}>
                    <Text style={styles.taskText}>{category}</Text>
                    <View style={styles.buttonsContainer}>
                        <Ionicons name="close-circle" size={50} color="#FF0000" />
                        <Ionicons name="checkmark-circle" size={50} color="#30BB3D" />
                    </View>
                </View>
            ))}

            <View style={styles.iconContainer}>
                <Ionicons name="add-circle" size={70} color="#1C6B3C" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    darkModeContainer: {
        backgroundColor: "#000",
    },
    titleContainer: {
        backgroundColor: "#1C6B3C",
        width: "100%",
        height: "11%",
        justifyContent: "center",
        alignItems: "center",
    },
    darkModeTitleContainer: {
        backgroundColor: "#000",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    darkModeTitle: {
        color: "#fff",
    },
    taskContainer: {
        backgroundColor: "#F6FAFF",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#000",
    },
    darkModeTaskContainer: {
        backgroundColor: "#333",
        borderColor: "#fff",
    },
    taskText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: "row-reverse",
    },
    iconContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});