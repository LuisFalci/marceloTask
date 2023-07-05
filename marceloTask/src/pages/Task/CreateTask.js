import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import { ThemeContext } from '../../utils/ThemeProvider';
import actions from "../../services/sqlite/Task";
import categoryActions from "../../services/sqlite/Category";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import * as Notify from 'expo-notifications';

export default function CreateTask({ navigation }) {
  const { darkModeEnabled } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([{ id: '', title: '' }]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  Notify.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

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

  const createTask = async () => {
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());

    if (selectedDateTime < currentDate) {
      setErrorMessage("A data e hora selecionadas já se passaram");
      return;
    }

    const task = {
      title: title,
      description: description,
      date: selectedDate.toISOString(),
      time: selectedTime.toISOString(),
      category: selectedCategory
    };

    // Find the selected category
    const category = categories.find((cat) => cat.id === selectedCategory);
    let advanceMinutes = 0;
    if (category && category.minutes) {
      advanceMinutes = category.minutes;
    }

    let seconds = calculateSeconds(task.date, task.time, advanceMinutes);
    console.log(seconds)

    if (seconds < 0) {
      setErrorMessage("A data e hora selecionadas já se passaram");
      return;
    }

    const schedulingOptions = {
      content: {
        title: `Realizar Tarefa: ${task.title}`,
        body: `Descrição: ${task.description}`,
        data: [],
      },
      trigger: {
        seconds,
      },
    };

    const notificationId = await Notify.scheduleNotificationAsync(schedulingOptions);
    task.notificationId = notificationId;

    actions.createTask(task)
      .then((id) => console.log(`Nova tarefa criada com o ID ${id}`))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));

    setErrorMessage(""); // Clear error message
  };

  function calculateSeconds(dateString, timeString, advanceMinutes = 0) {
    let notifyDate = new Date(dateString);
    let notifyTime = new Date(timeString);

    notifyDate.setHours(notifyTime.getHours(), notifyTime.getMinutes() - advanceMinutes, notifyTime.getSeconds());

    let currentDate = new Date();
    let currentTime = new Date();

    currentDate.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());

    let differenceInSeconds = (notifyDate.getTime() - currentDate.getTime()) / 1000;
    return differenceInSeconds;
  }

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
              <Picker.Item key={category.id} label={category.title} value={category.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.expirationContainer}>
          <Text style={[styles.expirationText, darkModeEnabled && styles.darkModeExpirationText]}>Expira em:</Text>
          <View style={styles.datetimeContainer}>
            <View style={styles.datetimeInputContainer}>
              {/* Inserir Data */}
              <Text style={styles.datetimeInputLabel}>Data:</Text>
              <TouchableOpacity
                style={[styles.datetimeButton, darkModeEnabled && styles.darkModeDatetimeButton]}
                onPress={() => setShowDateTimePicker(true)}
              >
                <Text style={styles.datetimeButtonText}>
                  {selectedDate.toLocaleDateString('pt-BR')}
                </Text>
              </TouchableOpacity>
              {showDateTimePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(event, selected) => {
                    const currentDate = selected || selectedDate;
                    setShowDateTimePicker(false);
                    setSelectedDate(currentDate);
                  }}
                />
              )}
            </View>
            <Text style={styles.datetimeSeparator}></Text>
            <View style={styles.datetimeInputContainer}>
              {/* Inserir Horas */}
              <Text style={styles.datetimeInputLabel}>Hora:</Text>
              <TouchableOpacity
                style={[styles.datetimeButton, darkModeEnabled && styles.darkModeDatetimeButton]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.datetimeButtonText}>
                  {selectedTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="default"
                  onChange={(event, selected) => {
                    const currentTime = selected || selectedTime;
                    setShowTimePicker(false);
                    setSelectedTime(currentTime);
                  }}
                />
              )}
            </View>
          </View>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
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
    padding: 30, // Espaçamento interno do container (opcional)
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
    marginTop: 10,
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
  datetimeButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkModeDatetimeButton: {
    backgroundColor: '#555',
  },
  datetimeButtonText: {
    color: '#000',
    marginLeft: 5,
  },
  darkModeDatetimeButtonText: {
    color: '#fff',
  },
});
