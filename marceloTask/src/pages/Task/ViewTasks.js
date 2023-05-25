import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import actions from "../../services/sqlite/Task";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../utils/ThemeProvider';

export default function ViewTasks() {
  const navigation = useNavigation();
  const { darkModeEnabled } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    actions
      .getUsers()
      .then((response) => setTasks(response))
      .catch((error) =>
        console.error(`Erro ao criar nova tarefa: ${error}`)
      );
  };

  const deleteTask = (id) => {
    actions
      .deleteTask(id)
      .then((response) => setTasks(response))
      .catch((error) =>
        console.error(`Erro ao criar nova tarefa: ${error}`)
      );
  };

  const handleTaskDoubleClick = (task) => {
    navigation.navigate("EditTask", { task: task });
  };

  return (
    <View
      style={[
        styles.container,
        darkModeEnabled && styles.darkModeContainer,
      ]}
    >
      <View
        style={[
          styles.titleContainer,
          darkModeEnabled && styles.darkModeTitleContainer,
        ]}
      >
        <Text style={[styles.title, darkModeEnabled && styles.darkModeTitle]}>
          Minhas Tarefas
        </Text>
      </View>

      {/* Barra de buscas */}
      <View
        style={[styles.searchBar, darkModeEnabled && styles.darkModeSearchBar]}
      >
        <View style={styles.searchIconContainer}>
          <Ionicons
            name="search"
            size={30}
            color={darkModeEnabled ? "#FFFFFF" : "#000000"}
          />
        </View>
        <Text style={[styles.searchText, darkModeEnabled && styles.darkModeSearchText]}>
          Buscar tarefas
        </Text>
        <View style={styles.filterIconContainer}>
          <Ionicons
            name="funnel"
            size={30}
            color={darkModeEnabled ? "#FFFFFF" : "#000000"}
          />
        </View>
      </View>
      <ScrollView>
        {/* Containers de tarefa */}
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TouchableOpacity
              onPress={() => handleTaskDoubleClick(task)}
              key={task.id}
            >
              <View
                style={[
                  styles.taskContainer,
                  darkModeEnabled && styles.darkModeTaskContainer,
                ]}
              >
                <View>
                  <Text
                    style={[styles.taskText, darkModeEnabled && styles.darkModeTaskText]}
                  >
                    {task.title}
                  </Text>
                  <View style={styles.taskDetailsContainer}>
                    <Text style={styles.taskDetailText}>
                      Início: {task.createdAt}
                    </Text>
                    <Text style={styles.taskDetailText}>
                      Término: {task.duration}
                    </Text>
                    <Text style={styles.taskDetailText}>
                      Horário: {task.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <Ionicons
                    name="close-circle"
                    size={50}
                    color="#FF0000"
                    onPress={() => deleteTask(task.id)}
                  />
                  <Ionicons
                    name="checkmark-circle"
                    size={50}
                    color="#30BB3D"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhuma tarefa encontrada</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("CreateTask")}
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
  darkModeTaskText: {
    color: "#fff",
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
  darkModeSearchBar: {
    backgroundColor: "#333",
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
  },
  darkModeSearchText: {
    color: "#fff",
  },
  filterIconContainer: {
    marginLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  taskDetailsContainer: {
    marginTop: 10,
  },
  taskDetailText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
