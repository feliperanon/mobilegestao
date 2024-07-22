// mobilegestaoApp/App.js

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Dashboard from './src/components/Dashboard';
import History from './src/screens/History';
import Analysis from './src/screens/Analysis';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
