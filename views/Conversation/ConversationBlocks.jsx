import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {fontSize, colors} from '../../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width - 16;

export function ConversationBlocks(props) {
  const {onPress} = props.onPress;
  const {url, showUrL, isMe, timestamp, messageText} = props.item;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{flexDirection: 'row', flex: 1}}>
        {isMe === false && showUrL === true ? (
          <Image style={styles.avatarImg} source={{uri: url}} />
        ) : (
          <View style={{width: 57}} />
        )}

        <View style={{ maxWidth: (screenWidth*3)/4, marginLeft: isMe === true ? 'auto' : 0 }}>
          <Text style={{    
            minHeight: 50,
            padding: 10,
            borderRadius: 10,
            fontSize: 15,
            color: 'black',  // F7F7F7
            backgroundColor: isMe == false ? '#F3F3F3' : '#FFDEB9'  // 53A5EE
          }}>{messageText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  avatarImg: {
    width: 47,
    height: 47,
    borderRadius: 50,
    // alignSelf: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
    marginBottom: 2,
  },

  messageText: {
    minHeight: 50,
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    color: 'black',
    backgroundColor: '#E0E0E0',
  },
});
