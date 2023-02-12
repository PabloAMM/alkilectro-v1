import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Events from '../screens/events/Events'
import AddEvent from '../screens/events/AddEvent'
import Event from '../screens/events/Event'
import TabEvents from './tabNavigations/TabEvents'

const Stack = createStackNavigator()

export default function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="eventsProgrammed"
        component={TabEvents}
        options={{ title: "Lista de eventos" }}
      />
      <Stack.Screen
        name="add-event"
        component={AddEvent}
        options={{ title: "Crear evento" }}
      />
      <Stack.Screen
        name="event"
        component={Event}
      />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})