import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import {fontSize, colors} from '../../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import UIHeader from '../../components/UIHeader';
import {ConversationBlocks} from './ConversationBlocks';
import AsyncStorage from '@react-native-async-storage/async-storage';  // lưu dữ liệu vào thiết bị
import { 
  auth, 
  onAuthStateChanged, 
  firebaseDatabaseRef, 
  firebaseSet, 
  db, 
  child, 
  get,
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  onValue
} from '../../firebase/firebase';

const screenWidth = Dimensions.get('window').width - 16;

export function Conversation(props) {
  // navigation
  const {navigation, route} = props;
  // function of navigate to/back
  const {navigate, goBack} = navigation;

  const [chatHistory, setChatHistory] = useState([
    {
      url: '',
      showUrL: true,
      isMe: true,
      timestamp: 1681225014000,
      messageText: 'Hello',
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: true,
      isMe: false,
      timestamp: 1681916214000,
      messageText: 'How are you?',
    },
    {
      url: '',
      showUrL: true,
      isMe: true,
      timestamp: 1681916274000,
      messageText: "I'm fine!",
    },
    {
      url: '',
      showUrL: false,
      isMe: true,
      timestamp: 1681916334000,
      messageText:
        "I'm Ahaaaaahaaahaaaa eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682002943000,
      messageText: `Callback that is called when the text input's text changes. Changed text is passed as a single string argument to the callback handler.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003000,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003001,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003002,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003003,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003004,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003005,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: false,
      isMe: false,
      timestamp: 1682003003010,
      messageText: `I love Emilia.`,
    },
    {
      url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
      showUrL: true,
      isMe: false,
      timestamp: 1682003003020,
      messageText: `I love Emilia.`,
    },
  ]);
  const [typedText, setTypedText] = useState('')
  const [heightTextInput, setHeightTextInput] = useState(0);

  // {url, name, email, accessToken, lastMessage, numberOfUnreadMessage, userId}
  const {friend} = props.route.params;  // friend lấy từ file Chat

  return (
    <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
      {/*=== Header ===*/}
      <UIHeader
        title={friend.name}
        leftIconName={'chevron-left'}
        rightIconName={'ellipsis-v'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          alert('Press left icon');
        }}
      />

      {/*=== Body ===*/}
      <FlatList
        style={{flex: 1, backgroundColor: 'white'}}
        data={chatHistory}
        keyExtractor={item => item.timestamp + ``}
        renderItem={({item}) => (
          <ConversationBlocks item={item} onPress={() => {}} />
        )}
      />

      {/*=== Text Input & Send button  */}
      <View style={styles.bottomContainer}>
          <ScrollView>
              <TextInput 
                  style={[styles.textInput, { height: Math.max(35, heightTextInput) }]}
                  // style={styles.textInput}
                  onChangeText={(typedText) => {
                    setTypedText(typedText);
                  }}
                  value={typedText}
                  placeholder='Enter your message here!'
                  multiline={true}
                  rows={5}
                  numberOfLines={5}
                  onContentSizeChange={(event) =>
                    setHeightTextInput(event.nativeEvent.contentSize.height)
                  }
                />
          </ScrollView>
          
          {/* button send messenger */}
          <TouchableOpacity 
              style={{height: 40, marginTop: 10, marginLeft: 3}}
              onPress={async () => {
                // debugger
                if(typedText.trim().length == 0) {
                  return
                }  
                
                // Người gửi: (lấy value dựa vào key, key là user ở màn hình Wellcome)
                let stringUser = await AsyncStorage.getItem("user")  // được lưu ở dạng string (lấy dữ liệu này từ AsyncStorage đã lưu khi đăng nhập)
                let myUserId =  JSON.parse(stringUser).userId  // chuyển stringUser sang object
                let myFriendUserId = friend.userId  // lấy giá trị id của bạn bè mình đang nhắn tin

                // Thông tin liên quan đến đoạn chat: 
                let newMessengerObject = {
                    url: '',  // url ảnh của mình
                    showUrL: false,
                    // isMe: true,  // là true vì mình là người gửi
                    timestamp: (new Date()).getTime(),
                    messageText: typedText,
                }

                Keyboard.dismiss(); // ẩn Keyboard đi khi nhấn nút gửi

                // save to firebase db:
                // key: firebaseDatabaseRef( db, `conversations/${myUserId-myFriendUserId}`) 
                firebaseSet(firebaseDatabaseRef( db, `conversations/${myUserId}-${myFriendUserId}`), newMessengerObject)
                  .then(() => {
                    setTypedText("");  // khi gửi thành công thì xóa đoạn text ở trong input đi
                  })
                
              }}> 
              <Icon
                name="paper-plane"
                size={30}
                color={colors.primary}
                style={{padding: 3}}
              />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
  },

  bottomContainer: {
    height: 80, 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    // flex: 1, 
    // position: 'absolute', 
    // bottom: 0, 
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 20,
    // maxHeight: 150,s
    // backgroundColor: 'red'
  },

  textInput: {
    height: 40, 
    paddingLeft: 10, 
    marginTop: 10, 
    marginLeft: 20, 
    width: screenWidth - 60, 
    backgroundColor: '#F3F3F3', 
    borderRadius: 20,
    fontSize: 16
  }
});
