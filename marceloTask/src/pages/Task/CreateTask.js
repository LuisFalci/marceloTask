import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import { ThemeContext } from '../../utils/ThemeProvider';
import { Picker } from "@react-native-picker/picker";
import actions from "../../services/sqlite/Task";
import categoryActions from "../../services/sqlite/Category";

export default function CreateTask({ navigation }) {
  const { darkModeEnabled } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([{ id: '', title: '' }]);
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationTime, setExpirationTime] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    categoryActions.getCategories()
      .then((response) => {
        const categoriesWithEmptyOption = [{ id: '', title: '' }, ...response];
        setCategories(categoriesWithEmptyOption);
      })
      .catch((error) => console.error(`Erro ao criar nova categoria: ${error}`));
  };

  const createTask = () => {
    actions.createTask({ title: title, description: description, duration: '2022-03-28' })
      .then((id) => console.log(`Nova tarefa criada com o ID ${id}`))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
  };

  const getTasks = () => {
    actions.getUsers()
      .then((response) => setTasks(response))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
  };

  console.log(categoryActions.getCategories());

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
        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Categoria</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={[styles.input, darkModeEnabled && styles.darkModeInput]}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.title} value={category.title} />
            ))}
          </Picker>
        </View>
        <View style={styles.expirationContainer}>
          <Text style={[styles.expirationText, darkModeEnabled && styles.darkModeExpirationText]}>Expira em:</Text>
          <View style={styles.datetimeContainer}>
            <View style={styles.datetimeInputContainer}>
              <Text style={styles.datetimeInputLabel}>Data:</Text>
              <TextInput
                placeholderTextColor={darkModeEnabled ? "#F0F0F0" : "#000000"}
                style={[styles.datetimeInput, darkModeEnabled && styles.darkModeDatetimeInput]}
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
            </View>
            <Text style={styles.datetimeSeparator}></Text>
            <View style={styles.datetimeInputContainer}>
              <Text style={styles.datetimeInputLabel}>Hora:</Text>
              <TextInput
                placeholderTextColor={darkModeEnabled ? "#F0F0F0" : "#000000"}
                style={[styles.datetimeInput, darkModeEnabled && styles.darkModeDatetimeInput]}
                value={expirationTime}
                onChangeText={setExpirationTime}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, darkModeEnabled && styles.darkModeButton]} onPress={createTask}>
            <Text style={[styles.buttonText, darkModeEnabled && styles.darkModeButtonText]}>Salvar</Text>
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
  expirationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  expirationText: {
    fontSize: 16,
    color: '#000',
  },
  darkModeExpirationText: {
    color: '#fff',
  },
    datetimeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 20,
      marginBottom: 20,
      borderWidth: 1, // Largura da borda
      borderColor: 'black', // Cor da borda
      padding: 30 , // Espaçamento interno do container (opcional)
    },
  datetimeInputContainer: {
    flex: 1,
  },
  datetimeInputLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  datetimeInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
  darkModeDatetimeInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  datetimeSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 20
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
