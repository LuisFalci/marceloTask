import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import actions from "../services/sqlite/Task";
import { useNavigation } from '@react-navigation/native';

export default function Tasks() {
    const navigation = useNavigation();

    const [tasks, setTasks] = useState();

    getTasks();

    function getTasks() {
        actions.all()
            .then((response) => setTasks(response))
            .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
    }

    function deleteTask(id) {
        actions.remove(id)
            .then((response) => setTasks(response))
            .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
    }

    const handleTaskDoubleClick = (task) => {
        navigation.navigate('Edit', { task: task });
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minhas Tarefas</Text>
            </View>

            {/* Barra de buscas */}
            <View style={styles.searchBar}>
                <View style={styles.searchIconContainer}>
                    <Ionicons name="search" size={30} color="#000000" />
                </View>
                <Text style={styles.searchText}>Buscar tarefas</Text>
                <View style={styles.filterIconContainer}>
                    <Ionicons name="funnel" size={30} color="#000000" />
                </View>
            </View>
            <ScrollView>


                {/* Containers de tarefa */}
                {
                    tasks && tasks.length > 0 ?
                        tasks.map((task) => {
                            return (
                                <TouchableOpacity onPress={() => handleTaskDoubleClick(task)}>
                                    <View style={styles.taskContainer} key={task.id}>
                                        <Text>{task.title}</Text>
                                        <View style={styles.buttonsContainer}>
                                            <Ionicons name="close-circle" size={50} color="#FF0000" onPress={() => deleteTask(task.id)} />
                                            <Ionicons name="checkmark-circle" size={50} color="#30BB3D" />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                        : null
                }
            </ScrollView>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Create')}
            >
                <Ionicons name="add-circle" size={70} color="#1C6B3C" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    titleContainer: {
        backgroundColor: "#1C6B3C",
        width: "100%",
        height: "11%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff"
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
    buttonsContainer: {
        flexDirection: "row-reverse",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 40,
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    searchIconContainer: {
        marginRight: 10,
    },
    searchText: {
        flex: 1,
        fontSize: 16,
    },
    filterIconContainer: {
        marginLeft: 10,
    },
    iconContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
