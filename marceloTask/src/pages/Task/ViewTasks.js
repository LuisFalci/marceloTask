import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import actions from "../../services/sqlite/Task";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../utils/ThemeProvider';
import { format } from "date-fns";

export default function ViewTasks() {
  const navigation = useNavigation();
  const { darkModeEnabled } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTasks(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    loadTasks();   
  }, [tasks]);

  const loadTasks = (query = "") => {
    actions
      .getTasks(query)
      .then((response) => setTasks(response))
      .catch((error) =>
        console.error(`Erro ao carregar tarefas: ${error}`)
      );
  };

  const deleteTask = (id) => {
    actions
      .deleteTask(id)
      .then((response) => {
        setTasks(response)
      })
      .catch((error) =>
        console.error(`Erro ao criar nova tarefa: ${error}`)
      );

  };

  const handleTaskDoubleClick = (task) => {
    navigation.navigate("Editar Tarefa", { task: task });
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
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar tarefas"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
          tasks
            .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((task) => (
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
                    <Text style={styles.taskDetailText}>
                      {task.description}
                    </Text>
                    <View style={styles.taskDetailsContainer}>
                      <Text style={styles.taskDetailText}>
                        Término: {format(new Date(task.date), "dd/MM/yyyy")} | {format(new Date(task.time), "HH:mm")}
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
        onPress={() => navigation.navigate("Criar Tarefa")}
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
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
