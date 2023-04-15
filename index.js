/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {
  Wellcome,
  Login,
  Register,
  FoodList,
  ProductGridView,
  Settings,
} from './views/index';
import UITab from './navigation/UITab';
import MyApp from './navigation/MyApp';

let listProducts = [
  {
    productName: 'iphone 3',
    year: 2013,
  },
  {
    productName: 'iphone 5',
    year: 2015,
  },
  {
    productName: 'iphone 4',
    year: 2014,
  },
];

AppRegistry.registerComponent(appName, () => () => <MyApp />);
