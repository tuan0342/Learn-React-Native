import React, {Component, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Wellcome, Login, Register} from '../views';
import UITab from './UITab';

const Stack = createNativeStackNavigator();

function MyApp(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Wellcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Wellcome'} component={Wellcome} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        <Stack.Screen name={'UITab'} component={UITab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyApp;
