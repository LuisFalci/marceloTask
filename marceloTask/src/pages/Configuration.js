import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import CheckBox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

export default function Configuration() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person" size={60} color="black" />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={notificationEnabled}
                    onValueChange={(newValue) => setNotificationEnabled(newValue)}
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>Ativar Notificação</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={darkModeEnabled}
                    onValueChange={(newValue) => setDarkModeEnabled(newValue)}
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>Ativar Dark Mode</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        height: 80,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: "#D9D9D9",
    },
    inputContainer: {
        marginVertical: 20,
        marginHorizontal: 40,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        height: 40,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 40,
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
        width: 40,
        height: 40,
        marginTop:15
    },
    checkboxLabel: {
        fontSize: 16,
    },
    button: {
        height: 50,
        backgroundColor: "#1C6B3C",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 200,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
