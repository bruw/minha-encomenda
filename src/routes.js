import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import AddPackage from './pages/AddPackage';
import About from './pages/About';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> 
        <Stack.Screen options={{ headerShown: false }} name="AddPackage" component={AddPackage} />
        <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}