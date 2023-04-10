import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function UIButton(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          borderColor: 'white',
          borderWidth: 1,
          height: 45,
          borderRadius: 5,
          marginHorizontal: 15,
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.isSelected == true ? 'white' : null,
        }}>
        {props.isSelected == true && (
          <Icon
            name={'check-circle-o'}
            size={20}
            style={styles.bodyContent_TouchableOpacity_icon}
          />
        )}
        <Text style={{color: props.isSelected == true ? '#ED6263' : 'white'}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContent_TouchableOpacity_icon: {
    color: 'green',
    position: 'absolute',
    left: 10,
    top: 10,
  },
});

export default UIButton;
