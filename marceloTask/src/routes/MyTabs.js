import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Configuration from '../pages/Configuration';

// Task CRUD
import ViewTasks from '../pages/Task/ViewTasks';
import CreateTask from '../pages/Task/CreateTask';
import EditTask from '../pages/Task/EditTask';

// Category CRUD
import ViewCategories from '../pages/Category/ViewCategories';
import CreateCategory from '../pages/Category/CreateCategory';
import EditCategory from '../pages/Category/EditCategory';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Menu na parte de baixo 
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Configuration"
        component={Configuration}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={40} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="ViewTasks"
        component={ViewTasks}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="edit" size={30} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="ViewCategories"
        component={ViewCategories}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={30} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
      />
      <Stack.Screen
        name="CreateCategory"
        component={CreateCategory}
      />
        <Stack.Screen
        name="EditCategory"
        component={EditCategory}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
