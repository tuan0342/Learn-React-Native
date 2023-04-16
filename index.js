/**
  Cài đặt thư viện ngoài:
    + yarn add react-native-keyboard-aware-scroll-view

    + yarn add react-navigation
	  + yarn add react-native-safe-area-context (cho màn hình tai thỏ)
	  + yarn add @react-navigation/bottom-tabs
	  + yarn add @react-navigation/native
	  + yarn add @react-navigation/native-stack (để di chuyển giữa các màn hình khác nhau)
	  + yarn add react-native-screens

    + yarn add axios (gọi API)

    + yarn add react-native-chart-kit
    + yarn add react-native-svg
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
