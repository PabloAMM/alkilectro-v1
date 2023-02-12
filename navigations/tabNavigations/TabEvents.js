import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScheduledEvents from '../../screens/events/ScheduledEvents'
import OnProcessEvents from '../../screens/events/OnProcessEvents'
import CompletedEvents from '../../screens/events/CompletedEvents'
import CanceledEvents from '../../screens/events/CanceledEvents'


const Tab = createMaterialTopTabNavigator();

function TabStack() {
    const insets = useSafeAreaInsets()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#F8F8F8',
                tabBarScrollEnabled :true,
                tabBarStyle: {
                    backgroundColor: '#5c846c',
                },
                tabBarLabelStyle: {
                    textAlign: 'center',
                    fontSize: 14
                },
                tabBarIndicatorStyle: {
                    borderBottomColor: '#87B56A',
                    borderBottomWidth: 2,
                },
            }}
        >
            <Tab.Screen
                name="Scheduled"
                component={ScheduledEvents}
                options={{
                    tabBarLabel: 'Programados',
                    
                }}
            />
            <Tab.Screen
                name="OnProcess"
                component={OnProcessEvents}
                options={{
                    tabBarLabel: 'En proceso'
                }}
            />
            <Tab.Screen
                name="Completed"
                component={CompletedEvents}
                options={{
                    tabBarLabel: 'Completados'
                }}
            />
            <Tab.Screen
                name="Canceled"
                component={CanceledEvents}
                options={{
                    tabBarLabel: 'Cancelados'

                }}
            />
        </Tab.Navigator>
    );
}

export default function TabEvents() {
    return (
        <TabStack />

    )
}

const styles = StyleSheet.create({})