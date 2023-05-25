import React, { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    View,
    Button,
    ScrollView
} from "react-native";
import { ThemeContext } from '../../utils/ThemeProvider';

import actions from "../../services/sqlite/Task";

export default function EditTask(props) {
    const { route } = props;
    const { task } = route.params;
    const { darkModeEnabled } = useContext(ThemeContext);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [duration, setDuration] = useState(null);

    const editTask = () => {
        actions.updateTask({ id: task.id, title: title, description: description, duration: '2022-03-28' })
            .then((id) => {
                console.log(`Tarefa editada com o ID ${ id }`)})
            .catch((error) => console.error(`Erro ao editar tarefa: ${ error }`));
    };

    return (
        <SafeAreaView style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
            <View style={[styles.containerMargin, darkModeEnabled && styles.darkModeContainerMargin]}>
                <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Título</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholderTextColor={darkModeEnabled ? "#F0F0F0" : "#000000"}
                        style={[styles.input, darkModeEnabled && styles.darkModeInput]}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Descrição</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholderTextColor={darkModeEnabled ? "#F0F0F0" : "#000000"}
                        style={[styles.input, darkModeEnabled && styles.darkModeInput]}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, darkModeEnabled && styles.darkModeButton]} onPress={editTask}>
                        <Text style={[styles.buttonText, darkModeEnabled && styles.darkModeButtonText]}>Editar task</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    darkModeContainer: {
        backgroundColor: '#000',
    },
    containerMargin: {
        marginTop: 60,
    },
    darkModeContainerMargin: {
        marginTop: 80,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 20,
        color: '#000',
    },
    darkModeLabel: {
        color: '#fff',
    },
    inputContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 10,
        color: '#000',
    },
    darkModeInput: {
        backgroundColor: '#333',
        color: '#fff',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    button: {
        backgroundColor: '#1C6B3C',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        width: '90%',
        marginHorizontal: 20,
    },
    darkModeButton: {
        backgroundColor: '#333',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    darkModeButtonText: {
        color: '#fff',
    },
});