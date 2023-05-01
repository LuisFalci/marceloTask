import React, { useState } from "react";
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
// import DateTimePickerModal from "react-native-modal-datetime-picker";


import actions from "../services/sqlite/Task";

export default function Create({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [duration, setDuration] = useState(null);
  const [tasks, setTasks] = useState();

  getTasks();

  function createTask() {
    actions.create({ title: title, description: description, duration: '2022-03-28' })
      .then((id) => console.log(`Nova tarefa criada com o ID ${id}`))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
  }
  function getTasks() {
    actions.all()
      .then((response) => setTasks(response))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerMargin}>
        <Text style={styles.label}>Título</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <Text style={styles.label}>Descrição</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={createTask}>
            <Text style={styles.buttonText}>Criar task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 60
  },
  button: {
    backgroundColor: '#1C6B3C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerMargin: {
    marginTop: 60
  }

});



