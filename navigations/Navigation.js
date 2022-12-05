import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AccountStack from "./AccountStack";
import EquipmentStack from "./EquipmentStack";
import InventoryStack from "./InventoryStack";
import EventsStack from "./EventsStack";
import ReportsStack from "./ReportsStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "events":
        iconName = "calendar";
        break;
      case "equipment":
        iconName = "audio-video";
        break;
      case "inventory":
        iconName = "package-variant";
        break;
      case "report":
        iconName = "chart-box-outline";
        break;
      case "account":
        iconName = "account-circle-outline";
        break;
    }

    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="events"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: "#21745d",
          tabBarInactiveTintColor: "#828a95",
          tabBarStyle: [{ display: "flex" }],
        })}
      >
        <Tab.Screen
          name="events"
          component={EventsStack}
          options={{ title: "Eventos" }}
        />
        <Tab.Screen
          name="equipment"
          component={EquipmentStack}
          options={{ title: "Equipos" }}
        />
        <Tab.Screen
          name="inventory"
          component={InventoryStack}
          options={{ title: "Inventario" }}
        />
        <Tab.Screen
          name="report"
          component={ReportsStack}
          options={{ title: "Reportes" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
