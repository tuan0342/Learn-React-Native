import React, {useEffect, useState} from 'react';
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
import UIHeader from '../../components/UIHeader';
import {ChatBlocks} from './ChatBlocks';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


export function Chat(props) {
  // navigation
  const {navigation, route} = props;
  // function of navigate to/back
  const {navigate, goBack} = navigation;

  const [usersMes, setUsersMes] = useState([
    // {
    //   url: 'https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg',
    //   name: 'Kim Hajin',
    //   lastMessage: `Hello, i'm kim hajin`,
    //   numberOfUnreadMessage: 1,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/3/33/Yi_Byul.png/revision/latest?cb=20230404164627',
    //   name: 'Boss',
    //   lastMessage: `At some point later`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/6/62/Chae_Nayun1.png/revision/latest?cb=20220630181612',
    //   name: 'Chae Nayun',
    //   lastMessage: `Chae Nayun was a fourth generation chaebol`,
    //   numberOfUnreadMessage: 2,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/6/6c/Jin_Sahyuk.jpg/revision/latest?cb=20181229080945',
    //   name: 'Jin Sahyuk',
    //   lastMessage: `She is a powerful villain in the world of 'The Novel's Extra". She was designed by Kim Hajin to be the "Final Boss" of his original work and was intended to be the complete opposite of Kim Suho`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/8/85/Yoo.png/revision/latest?cb=20221209094457',
    //   name: 'Yoo Yeonha',
    //   lastMessage: `She is very business savvy and intelligent. Yeonha is very dedicated and if she wants something`,
    //   numberOfUnreadMessage: 110,
    // },
    // {
    //   url: 'https://i.pinimg.com/originals/ed/76/95/ed7695fb3f654540c6634dddf7de8c3b.jpg',
    //   name: 'Rachel Elizabeth Louise AAA AAAAA AAAA AAA AAAAAAA AABBBB',
    //   lastMessage: `She has blonde hair and blue eyes`,
    //   numberOfUnreadMessage: 8,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/7/71/Kim_Suho1.png/revision/latest?cb=20220630181355',
    //   name: 'Kim Suho',
    //   lastMessage: `Kim Suho is righteous, honest man and a hard-worker`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/b/bc/05-344.jpg/revision/latest/scale-to-width-down/271?cb=20221128131751',
    //   name: 'Yun Seung-Ah',
    //   lastMessage: `Yun Seung-Ah might look kind and graceful on media`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/b/b0/Chae_Shinhyuk.png/revision/latest/scale-to-width-down/180?cb=20221003120340',
    //   name: 'Chae Shinhyuk',
    //   lastMessage: `Despite the fact he was the son of the famous Immortal Chae Joochul, Chae Shinhyuk didn't have a strong power like his father or his children.`,
    //   numberOfUnreadMessage: 7,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/6/64/Shin.png/revision/latest/scale-to-width-down/350?cb=20221209090540',
    //   name: 'Shin Jonghak',
    //   lastMessage: `As a child of a chaebol family, he is a narcissist and an elitist, because of this he cannot let anyone be above him.`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/3/3a/Yi_yeonghan.png/revision/latest/scale-to-width-down/340?cb=20230109054742',
    //   name: 'Yi Yeonghan',
    //   lastMessage: `Yi Yeonghan is one of the Kim Suho's closest supporters (In his inner circle).`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/1/1d/Yoo_uncle.png/revision/latest/scale-to-width-down/297?cb=20221212212650',
    //   name: 'Yoo Jinhyuk',
    //   lastMessage: `A private broker on Violet Banquet.`,
    //   numberOfUnreadMessage: 0,
    // },
    // {
    //   url: 'https://static.wikia.nocookie.net/the-novels-extra/images/b/be/Cheok.png/revision/latest/scale-to-width-down/350?cb=20221209084334',
    //   name: 'Cheok Jungyeong',
    //   lastMessage: `He is a musclehead who likes to fight strong people. He was described by Kim Hajin as the monster with the instincts of a savage beast and completely obsessed with the pursuit of strength`,
    //   numberOfUnreadMessage: 5,
    // },
  ]);

  useEffect(() => {
    // C1: Reload khi có sự thay đổi của database
    onValue(firebaseDatabaseRef(db, 'users'), async (snapshot) => {
        debugger
        if(snapshot.exists()) {
            // Lấy giá trị chọc từ db xuống
            let snapshotObject = snapshot.val();  // đối tượng

            // Lấy id của bản thân dựa vào 'AsyncStorage'
            let stringUser = await AsyncStorage.getItem("user")  // được lưu ở dạng string (lấy dữ liệu này từ AsyncStorage đã lưu khi đăng nhập)
            let myUserId =  JSON.parse(stringUser).userId  // chuyển stringUser sang object

            // Lấy tất cả user trên database rồi lưu vào usersMes để hiển thị đoạn hội thoại
            setUsersMes(Object.keys(snapshotObject)
              .filter(eachKey => eachKey != myUserId)  // lọc (chỉ lấy những thằng có userId khác myUserId)
              .map(eachKey => { // lấy theo key (userId) rồi duyệt theo từng key
                let eachObject = snapshotObject[eachKey]  // lấy object (đối tượng) theo key
                return {
                    url: "https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg",
                    name: eachObject.email,
                    email: eachObject.email,
                    accessToken: eachObject.accessToken,
                    lastMessage: `A private broker on Violet Banquet.`,
                    numberOfUnreadMessage: 0, 
                    userId: eachKey
                }
              }))
            // debugger
        } else {
            console.log(`No data available`);
        }
    })

    // C2: Lấy dữ liệu từ database về
    // const dbRef = firebaseDatabaseRef(db);
    // get(child(dbRef, 'users')).then((snapshot) => {
    //   debugger
    //   if(snapshot.exists()) {
    //     let value = snapshot.val();
    //     setUsersMes(Object.values(value).map(eachObject => {
    //       return {
    //         // default profile url
    //         url: "https://m.scan-manga.com/img/manga/The_Novel-s_Extra_(Remake)_1_4445.jpg",
    //         name: eachObject.email,
    //         email: eachObject.email,
    //         accessToken: eachObject.accessToken,
    //         lastMessage: `A private broker on Violet Banquet.`,
    //         numberOfUnreadMessage: 0, 
    //       }
    //     }))
    //     debugger
    //   } else {
    //     console.log(`No data available`);
    //   }
    // }).catch((error) => {
    //   console.error(`Cannot get users from Firebase: ${error}`);
    // })
  }, [])

  return (
    <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
      {/*=== Header ===*/}
      <UIHeader
        title={'Notifications'}
        leftIconName={'chevron-left'}
        rightIconName={'search'}
        onPressLeftIcon={() => {
          alert('Press left icon');
        }}
        onPressRightIcon={() => {
          alert('Press left icon');
        }}
      />

      {/*=== Notification ===*/}
      <View style={styles.notification}>
        <Text style={{color: '#3678B9', fontSize: 15}}>6 Message Unread</Text>
        <Icon
          name={'trash-o'}
          onPress={() => {
            alert('Delete notification');
          }}
          color={'#777777'}
          size={20}
          style={{padding: 10}}
        />
      </View>

      {/*=== Body ===*/}
      <FlatList
        style={{flex: 1}}
        data={usersMes}
        keyExtractor={item => item.accessToken}
        renderItem={({item}) => (
          <ChatBlocks
            user={item}  // truyền user sang file ChatBlock để hiển thị thông tin (tên bạn bè, avatar, số tin chưa đọc, tin nhắn gần nhất,..)
            onPress={() => {
              // sự kiện khi bấm vào ChatBlocks sẽ chuyển sang màn hình chat
              // truyền friend sang màn hình chat (convarsation)
              navigate('Conversation', {friend: item});  
            }}
          />
        )}
      />
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
});
