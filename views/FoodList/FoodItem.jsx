import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize, colors} from '../../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';

// Dấu gạch dưới biểu thị chỉ sử dụng trong hàm
function _getColorFromStatus(status) {
  if (status == 'Opening soon') {
    return colors.warning;
  } else if (status == 'Open now') {
    return colors.success;
  } else if (status == 'Closing soon') {
    return colors.alert;
  } else {
    return colors.warning;
  }
}

function FoodItem(props) {
  let {name, url, status, price, website, socialNetworks} = props.food;
  let onPress = props.onPress;

  return (
    <TouchableOpacity onPress={onPress} style={styles.bodyContainer}>
      {/* Left of container */}
      <Image
        style={styles.bodyContainerImg}
        source={{
          uri: url,
        }}
      />
      {/* Right of container */}
      <View style={styles.bodyContainerRight}>
        <Text style={styles.bodyContainerRightName}>{name}</Text>
        <View style={{height: 1, backgroundColor: 'black'}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: colors.lighBlack, fontSize: fontSize.h6}}>
            Status:{' '}
          </Text>
          <Text
            style={{color: _getColorFromStatus(status), fontSize: fontSize.h6}}>
            {status.toUpperCase()}
          </Text>
        </View>
        <Text style={{color: colors.lighBlack, fontSize: fontSize.h6}}>
          Price: {price}$
        </Text>
        <Text style={{color: colors.lighBlack, fontSize: fontSize.h6}}>
          Food type: pizza
        </Text>
        <Text style={{color: colors.lighBlack, fontSize: fontSize.h6}}>
          Website: {website}
        </Text>

        <View style={{flexDirection: 'row'}}>
          {socialNetworks['facebook'] != undefined && (
            <Icon
              name="facebook-square"
              size={18}
              color={colors.lighBlack}
              style={{marginHorizontal: 3}}
            />
          )}
          {socialNetworks['twitter'] != undefined && (
            <Icon
              name="twitter-square"
              size={18}
              color={colors.lighBlack}
              style={{marginHorizontal: 3}}
            />
          )}
          {socialNetworks['instagram'] != undefined && (
            <Icon
              name="instagram"
              size={18}
              color={colors.lighBlack}
              style={{marginHorizontal: 3}}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    height: 150,
    paddingTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
  },

  bodyContainerImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 15,
  },

  bodyContainerRight: {
    flex: 1,
    marginRight: 10,
  },

  bodyContainerRightName: {
    color: 'black',
    fontSize: fontSize.h6,
    fontWeight: 'bold',
  },
});

export default FoodItem;
