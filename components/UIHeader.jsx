import React from 'react';
import {Text, View} from 'react-native';
import {colors, fontSize} from '../constants/controlConst';

function UIHeader(props) {
  const {title} = props;
  return (
    <View
      style={{
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#FEF2F4',
          fontSize: fontSize.h3,
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </View>
  );
}

export default UIHeader;
