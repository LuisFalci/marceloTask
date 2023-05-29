import React, { useContext, useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import { ThemeContext } from '../../utils/ThemeProvider';
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import actions from "../../services/sqlite/Category";

export default function CreateCategory({ navigation }) {
  const { darkModeEnabled } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [sound, setSound] = useState(null);
  const [time, setTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  const iconOptions = [
    { label: "Ícone 1", value: "icon1" },
    { label: "Ícone 2", value: "icon2" },
    { label: "Ícone 3", value: "icon3" },
    // Adicione mais opções de ícones conforme necessário
  ];

  const createCategory = () => {
    actions.createCategory({ title: title })
      .then((id) => console.log(`Nova tarefa criada com o ID ${id}`))
      .catch((error) => console.error(`Erro ao criar nova tarefa: ${error}`));
  };

  const handleSelectSound = async () => {
    try {
      const soundResult = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      if (!soundResult.cancelled) {
        setSound(soundResult.uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar som da notificação:", error);
    }
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleDateTimeConfirm = (selectedDate) => {
    setTime(selectedDate);
    hideDateTimePicker();
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

        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Som da notificação</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.input, darkModeEnabled && styles.darkModeInput, styles.fileInput]}
            onPress={handleSelectSound}
          >
            <Text style={[styles.fileInputText, darkModeEnabled && styles.darkModeFileInputText]}>
              {/* {soundName} */}
            </Text>
          </TouchableOpacity>
          {sound && <Text style={[styles.fieldText, darkModeEnabled && styles.darkModeFieldText]}>{sound}</Text>}
        </View>

        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Ícone</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedIcon}
            style={[styles.input, darkModeEnabled && styles.darkModeInput]}
            onValueChange={(itemValue) => setSelectedIcon(itemValue)}
          >
            {iconOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>

        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Notificar antes de:</Text>
        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Hora</Text>
        <TouchableOpacity style={styles.inputContainer} onPress={showDateTimePicker}>
          <Text style={[styles.input, darkModeEnabled && styles.darkModeInput]}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="time"
          date={time}
          onConfirm={handleDateTimeConfirm}
          onCancel={hideDateTimePicker}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, darkModeEnabled && styles.darkModeButton]} onPress={createCategory}>
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
    padding: 10,
    color: '#000',
  },
  darkModeInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  darkModeFieldContainer: {
    backgroundColor: '#333',
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
  fieldText: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  darkModeFieldText: {
    color: '#fff',
  },
  fileInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInputText: {
    color: '#000',
    fontWeight: 'bold',
  },
  darkModeFileInputText: {
    color: '#fff',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  datePicker: {
    marginHorizontal: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
