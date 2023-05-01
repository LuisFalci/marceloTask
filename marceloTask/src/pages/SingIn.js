import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  
  export default function SingIn() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/Logo.png")} />
        <View style={styles.inputNameContainer}>
        <Text style={styles.labelName}>Digite seu nome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#F0F0F0"
          />

        </View>
        <View style={styles.inputButtonContainer}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.versionText}>version 0.0.1</Text>
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
      color: "#FFF",
    },
    button:{
      width: "95%",
      height: 40,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText:{
      fontSize:18,
      fontWeight:"bold",
      color:"#000000"
    },
    labelName:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "flex-start",
        marginBottom: 8, // ajuste para o espaçamento desejado
    },
    versionText: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 12, // ajuste para a altura do seu dispositivo
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
      }
  });