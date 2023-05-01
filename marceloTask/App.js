import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/routes/MyTabs';
import { StatusBar } from 'expo-status-bar';

function App() {
  return (
    <>
    <StatusBar hidden={true} />
    <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>

  );
}

export default App;
