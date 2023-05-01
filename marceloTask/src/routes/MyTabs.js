import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Configuration from '../pages/Configuration';
import Tasks from '../pages/Tasks';
import Category from '../pages/Category';
import Create from '../pages/Create';
import Edit from '../pages/Edit';

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
        name="Tasks"
        component={Tasks}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="edit" size={30} color="black" />
          ),
        }}
      />
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
        name="Categorys"
        component={Category}
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
        name="Create"
        component={Create}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
