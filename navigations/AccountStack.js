import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {  createStackNavigator } from '@react-navigation/stack';


import Account from '../screens/account/Account'
import login from '../screens/account/Login';
import Register from '../screens/account/Register';

const Stack = createStackNavigator()

export default function AccountStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="information"
            component={Account}
            options={{ title: "Información" }}
        />

         <Stack.Screen
            name="login"
            component={login}
            options={{ title: "Iniciar Sesión" }}
        />

          <Stack.Screen
            name="register"
            component={Register}
            options={{ title: "Registrarse" }}
        />




    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})