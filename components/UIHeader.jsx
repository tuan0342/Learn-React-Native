import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {colors, fontSize} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width - 16;

function UIHeader(props) {
  const {
    title,
    leftIconName = '', // truyền vào giá trị mặc định
    rightIconName = '',
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  return (
    <View
      style={{
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {leftIconName !== '' ? (
        <Icon
          name={leftIconName}
          onPress={onPressLeftIcon}
          color={'#FEF2F4'}
          size={20}
          style={{marginRight: 'auto', marginLeft: 5, padding: 10}}
        />
      ) : (
        ''
      )}

      <Text
        style={{
          color: '#FEF2F4',
          fontSize: fontSize.h3,
          fontWeight: '500',
        }}>
        {title.length < 29 ? title : title.substring(0, 29) + '...'}
      </Text>

      {rightIconName !== '' ? (
        <Icon
          name={rightIconName}
          onPress={onPressRightIcon}
          color={'#FEF2F4'}
          size={20}
          style={{marginLeft: 'auto', marginRight: 5, padding: 10}}
        />
      ) : (
        ''
      )}
    </View>
  );
}

export default UIHeader;
