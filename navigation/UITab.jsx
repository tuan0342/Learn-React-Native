/**
yarn add react-navigation
yarn add react-native-safe-area-context (cho màn hình tai thỏ)
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/native
yarn add @react-navigation/native-stack (để di chuyển giữa các màn hình khác nhau)
yarn add react-native-screens
 * **/

import React from 'react';
import {Settings, ProductGridView, FoodList, Profile, Chat} from '../views';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {fontSizes, colors} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const screenOption = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: '#EBEBEB',
  tabBarInactiveTintColor: '#3B3B3B',
  tabBarStyle: {
    height: 60,
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 5,
    backgroundColor: colors.primary,
  },
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'ProductGridView') {
      iconName = 'shopping-cart';
    } else if (route.name === 'FoodList') {
      iconName = 'cutlery';
    } else if (route.name === 'Chat') {
      iconName = 'comment';
    } else if (route.name === 'Settings') {
      iconName = 'cogs';
    } else {
      iconName = 'user';
    }

    // You can return any component that you like here!
    return (
      <Icon name={iconName} size={27} color={focused ? '#EBEBEB' : '#3B3B3B'} />
    );
  },
});

function UITab(props) {
  return (
    <Tab.Navigator screenOptions={screenOption}>
      <Tab.Screen
        name={'ProductGridView'}
        component={ProductGridView}
        options={{tabBarLabel: 'Products'}}
      />
      <Tab.Screen
        name={'FoodList'}
        component={FoodList}
        options={{tabBarLabel: 'Foods'}}
      />
      <Tab.Screen
        name={'Chat'}
        component={Chat}
        options={{tabBarLabel: 'Message'}}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{tabBarLabel: 'Setting'}}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

export default UITab;
