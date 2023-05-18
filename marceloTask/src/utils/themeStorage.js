// themeStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'theme';

export const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return theme !== null ? JSON.parse(theme) : false;
  } catch (error) {
    console.error('Error retrieving theme from storage:', error);
    return false;
  }
};

export const setTheme = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('Error saving theme to storage:', error);
  }
};
