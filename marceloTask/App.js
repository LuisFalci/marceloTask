import Spinner from 'react-native-loading-spinner-overlay';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/routes/MyTabs';
import { StatusBar } from 'expo-status-bar';
import SignIn from './src/pages/SignIn';
import actions from './src/services/sqlite/User';
import { ThemeProvider } from './src/utils/ThemeProvider';

function App() {
  const [userRegistered, setUserRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateUserRegistration = async () => {
    try {
      const users = await actions.getUsers();
      const isUserRegistered = users.length > 0;
      setUserRegistered(isUserRegistered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        // actions.deleteAllUsers();
        const users = await actions.getUsers();
        const isUserRegistered = users.length > 0;
        setUserRegistered(isUserRegistered);
        setLoading(false);
      } catch (error) {
        console.error(error);

      }
    };
    checkUserRegistration();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <StatusBar hidden={true} />
        <NavigationContainer>
          <Spinner
            visible={true}
            textContent={'Carregando...'}
            textStyle={{ color: '#FFF' }}
          />
        </NavigationContainer>
      </ThemeProvider>
    );
  }

  return (
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
  );
}

export default App;
