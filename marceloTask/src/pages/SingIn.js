import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getTheme, setTheme } from '../utils/themeStorage';
import actions from "../services/sqlite/User";

export default function SignIn(props) {
  const [userName, setUserName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [validationText, setValidationText] = useState("");
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const storedTheme = await getTheme();
    setDarkModeEnabled(storedTheme);
  };

  const toggleDarkMode = async () => {
    const updatedTheme = !darkModeEnabled;
    setDarkModeEnabled(updatedTheme);
    setTheme(updatedTheme);
  };

  async function createUser() {
    // Restante do código da função createUser

    try {
      await actions.create(userName);
      console.log('Usuário registrado com sucesso!');
      props.updateUserRegistration(); // Chama a função de atualização em App após o registro do usuário
    } catch (error) {
      console.error(`Erro ao registrar usuário: ${error}`);
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
      <Image style={styles.logo} source={require("../assets/Logo.png")} />
      <View style={styles.inputNameContainer}>
        <Text style={[styles.labelName, darkModeEnabled && styles.darkModeLabel]}>Digite seu nome</Text>
        <TextInput
          style={[styles.input, darkModeEnabled && styles.darkModeInput]}
          placeholderTextColor={darkModeEnabled ? "#777777" : "#F0F0F0"}
          onChangeText={setUserName}
        />
        <Text>{validationText}</Text>
      </View>
      <View style={styles.inputButtonContainer}>
        <TouchableOpacity style={[styles.button, darkModeEnabled && styles.darkModeButton]} onPress={createUser} disabled={buttonDisabled}>
          <Text style={[styles.buttonText, darkModeEnabled && styles.darkModeButtonText]}>Acessar</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.versionText, darkModeEnabled && styles.darkModeVersionText]}>version 0.0.1</Text>
      <TouchableOpacity style={styles.darkModeToggleButton} onPress={toggleDarkMode}>
        <Text style={styles.darkModeToggleText}>{darkModeEnabled ? 'Modo Claro' : 'Modo Escuro'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C6B3C",
  },
  darkModeContainer: {
    backgroundColor: "#000",
  },
  logo: {
    marginBottom: 18,
  },
  inputNameContainer: {
    width: "95%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  inputButtonContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 8,
    color: "#000000",
  },
  darkModeInput: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  darkModeButton: {
    backgroundColor: "#333333",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  darkModeButtonText: {
    color: "#FFFFFF",
  },
  labelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginBottom: 8, // ajuste para o espaçamento desejado
  },
  darkModeLabel: {
    color: "#FFFFFF",
  },
  versionText: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 12, // ajuste para a altura do seu dispositivo
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  darkModeVersionText: {
    color: '#000000',
  },
  darkModeToggleButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  darkModeToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
