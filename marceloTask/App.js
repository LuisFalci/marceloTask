import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/routes/MyTabs';
import { StatusBar } from 'expo-status-bar';
import SignIn from './src/pages/SingIn';
import actions from './src/services/sqlite/User';
import { ThemeProvider } from './src/utils/ThemeProvider';

function App() {
  const [userRegistered, setUserRegistered] = useState(false);

  const updateUserRegistration = async () => {
    try {
      const users = await actions.getUser();
      const isUserRegistered = users.length > 0;
      setUserRegistered(isUserRegistered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        // Resetar user (permite acessar pagina de register)
        // actions.deleteAllUsers();
        const users = await actions.getUser();
        console.log(users)
        const isUserRegistered = users.length > 0;
        setUserRegistered(isUserRegistered);
      } catch (error) {
        console.error(error);
        // Lidar com erros de forma apropriada, como exibir uma mensagem de erro na interface do usuário.
      }
    };

    // Chame a função de verificação ao montar o componente
    checkUserRegistration();
  }, []);

  return (
    <>
      <ThemeProvider>
        <StatusBar hidden={true} />
        <NavigationContainer>
          {!userRegistered ? (
            <SignIn updateUserRegistration={updateUserRegistration} />
          ) : (
            <MainNavigator />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
