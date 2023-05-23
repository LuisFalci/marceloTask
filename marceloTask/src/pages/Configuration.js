import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import CheckBox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/ThemeProvider';
import { setTheme } from '../utils/themeStorage';
import actions from "../services/sqlite/User";

export default function Configuration() {
  const { darkModeEnabled, toggleDarkMode } = useContext(ThemeContext);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    try {
      const user = await actions.getUser();
      if (user.length > 0) {
        setUserName(user[0].name);
        setUserId(user[0].id);
      }
    } catch (error) {
      console.error('Erro ao obter o nome do usuário:', error);
    }
  };

  const editUser = () => {
    if (userName.length >= 3 && userName.length <= 20 && userId !== '') {
      actions.update(userId, userName)
        .then((rowsAffected) => {
          setErrorMessage('');
          setSuccessMessage('Usuário editado com sucesso!');
          // Limpar a mensagem de sucesso após 5 segundos
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        })
        .catch((error) => {
          console.error(`Erro ao editar usuário: ${error}`);
          setErrorMessage('Erro ao editar usuário. Por favor, tente novamente.');
          setSuccessMessage('');
        });
    } else {
      if (userName.length < 3) {
        setErrorMessage('O nome deve ter pelo menos 3 caracteres.');
      } else if (userName.length > 20) {
        setErrorMessage('O nome deve ter no máximo 20 caracteres.');
      } else {
        setErrorMessage('Usuário inválido. Por favor, verifique os campos.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
      <View style={[styles.header, darkModeEnabled && styles.darkModeContainer]}>
        <Ionicons name="person" size={60} color={darkModeEnabled ? '#fff' : 'black'} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, darkModeEnabled && styles.darkModeLabel]}>Nome</Text>
        <TextInput
          style={[
            styles.input,
            darkModeEnabled && styles.darkModeInput,
            darkModeEnabled && styles.darkModePlaceholder,
          ]}
          value={userName}
          onChangeText={setUserName}
          placeholder="Insira seu nome"
          placeholderTextColor={darkModeEnabled ? '#aaa' : '#777'}
        />
      </View>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={notificationEnabled}
          onValueChange={(newValue) => setNotificationEnabled(newValue)}
          style={styles.checkbox}
        />
        <Text style={[styles.checkboxLabel, darkModeEnabled && styles.darkModeCheckboxLabel]}>Ativar Notificação</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
          style={styles.checkbox}
        />
        <Text style={[styles.checkboxLabel, darkModeEnabled && styles.darkModeCheckboxLabel]}>Ativar Dark Mode</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={editUser}>
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
  darkModeContainer: {
    backgroundColor: "#000",
  },
  header: {
    height: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 20,
    marginHorizontal: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  darkModeLabel: {
    color: "#fff",
  },
  input: {
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#000",
  },
  darkModeInput: {
    color: "#fff",  
  },
  darkModePlaceholder: {
    color: '#000',
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  successText: {
    color: 'green',
    fontSize: 16,
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
    marginTop: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  darkModeCheckboxLabel: {
    color: "#fff",
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
