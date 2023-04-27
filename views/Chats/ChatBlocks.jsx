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

export function ChatBlocks(props) {
  const {url, name, email, accessToken, lastMessage, numberOfUnreadMessage, userId} = props.user;
  const onPress = props.onPress;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/*=== avatar container ====*/}
      <View style={{height: 70, aspectRatio: 1, flexDirection: 'row'}}>
        <Image style={styles.avatarImg} source={{uri: url}} />
        {numberOfUnreadMessage !== 0 ? (
          <View style={styles.avatarNotification}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: '600',
              }}>
              {numberOfUnreadMessage < 100 ? numberOfUnreadMessage : '99+'}
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>

      {/*=== message ===*/}
      <View style={styles.messageContainer}>
        {/* name */}
        <Text style={styles.messageName}>
          {name.length > 15 ? name.substring(0, 15) + '...' : name}
        </Text>
        {/* message */}
        <Text
          style={{
            fontSize: 14,
            color: '#545454',
            fontWeight: numberOfUnreadMessage > 0 ? '600' : '300',
          }}>
          {lastMessage.length > 22
            ? lastMessage.substring(0, 22) + '...'
            : lastMessage}
        </Text>
      </View>

      {/*=== time ago ===*/}
      <View style={{justifyContent: 'center', flex: 1, padding: 5}}>
        <Text style={{color: '#8A8A8A', fontSize: 12, marginLeft: 'auto'}}>
          3 minutes ago
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: screenWidth,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    backgroundColor: 'white',
    marginHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row',
  },

  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'center',
    marginHorizontal: 5,
  },

  avatarNotification: {
    backgroundColor: '#EF0F0F',
    height: 20,
    aspectRatio: 1,
    position: 'absolute',
    borderRadius: 50,
    right: 2,
    top: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: screenWidth - 170,
  },

  messageName: {
    width: screenWidth - 96,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C1A1A',
  },
});
