import React from 'react';
import Navigation from './navigations/Navigation';
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

export default function App() {
  return (
    <Navigation/>
  );
}

